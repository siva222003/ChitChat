import { NextFunction, Response, Request } from "express";
import { User } from "../models/index";
import genAccessToken from "../utils/genAccessToken";
import genRefreshToken from "../utils/genRefreshToken";
import otpGenerator from "otp-generator";
import genHash from "../utils/genHash";
import crypto from "crypto";
import { Types } from "mongoose";
import { sendMail } from "../services/mailer";
import otpEmailTemplate from "../templates/otp";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import jwt from "jsonwebtoken";
import env from "../utils/validateEnv";
import {
  STATUS_BAD_REQUEST,
  STATUS_CONFLICT,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_SERVER_ERROR,
  STATUS_UNAUTHORIZED,
} from "../src/constants";
import { asyncHandler } from "../utils/asyncHandler";
import { IJWT_PAYLOAD } from "../interfaces/tokenI";
import resetPasswordEmailTemplate from "../templates/resetPassword";
import { userService } from "../src/server";

declare module "express-serve-static-core" {
  export interface Request {
    userId?: Types.ObjectId;
  }
}

export const generateTokens = async (id: Types.ObjectId) => {
  try {
    const user = await User.findById(id);
    const accessToken = genAccessToken(id);
    const refreshToken = genRefreshToken(id);

    if (user) {
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
    }
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      STATUS_SERVER_ERROR,
      "Some internal server occured.Couldn't generate the tokens"
    );
  }
};

// SignUp => register -> sendOtp -> verifyOtp

/*------------------- SignUp -------------------*/
export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { firstName, lastName, email, password } = req.body;

    /*
    @ Don't create a new user/object in database directly with this req.body 
      as there might be a chance that use filled the type of fields that are 
      present in the Schema but not filled by the user
  */

    const user = await userService.registerUser({ email, password, firstName, lastName });

    if (!user) return;

    req.userId = user._id;
    next();
  }
);

/*------------------- Send Otp -------------------*/
export const sendOtp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId } = req;

  if (!userId) return;

  const { user, otp } = await userService.sendOtp(userId);

  sendMail({
    to: user.email,
    html: otpEmailTemplate(otp),
  });

  res.status(200).json(new ApiResponse(STATUS_OK, {}, "Otp sent successfully"));
});

/*------------------- Verify Otp -------------------*/
export const verifyOtp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  console.log(email, otp);

  const { accessToken, refreshToken } = await userService.verifyOtp(email, otp);

  res
    .status(200)
    .json(new ApiResponse(STATUS_OK, { accessToken, refreshToken }, "User verified successfully"));
});

/*------------------- Login -------------------*/

export const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await userService.loginUser({ email, password });

  res
    .status(200)
    .json(new ApiResponse(STATUS_OK, { accessToken, refreshToken }, "Login Successful"));
});

/*------------------- Forgot Password -------------------*/

export const forgotPassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  const { user, resetURL } = await userService.forgotPassword(email);

  sendMail({
    to: user.email,
    html: resetPasswordEmailTemplate(resetURL, user.firstName),
  });

  res.status(200).json(new ApiResponse(STATUS_OK, {}, "Reset token sent successfully"));
});

/*------------------- Reset Password -------------------*/
export const resetPassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { password } = req.body;

  const resetToken = req.params.token;

  const token = await userService.resetPassword(password, resetToken);

  res
    .status(200)
    .json(new ApiResponse(STATUS_OK, { accessToken: token }, "Password Reseted Successfully"));
});



/*------------------- Refresh Token -------------------*/
export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.headers.auth as string;

    if (!refreshToken) {
      throw new ApiError(STATUS_BAD_REQUEST, "Refresh Token is required");
    }

    const decodedToken = jwt.verify(refreshToken, env.JWT_SECRET) as IJWT_PAYLOAD;

    const user = await User.findById(decodedToken?.id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (refreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const accessToken = genAccessToken(user._id);
  }
);

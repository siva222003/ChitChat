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

declare module "express-serve-static-core" {
  export interface Request {
    userId?: Types.ObjectId;
  }
}

const generateTokens = async (id: Types.ObjectId) => {
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

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { firstName, lastName, email, password } = req.body;

    /*
    @ Don't create a new user/object in database directly with this req.body 
      as there might be a chance that use filled the type of fields that are 
      present in the Schema but not filled by the user
  */

    const existing_user = await User.findOne({ email });

    if (existing_user && existing_user.verified) {
      throw new ApiError(STATUS_CONFLICT, "Email already exists");
    } else if (existing_user) {
      const hashedPassword = await genHash(password);
      const modifyObj = { firstName, lastName, password: hashedPassword };
      await User.findOneAndUpdate({ email }, modifyObj, {
        new: true,
        validateModifiedOnly: true,
      });

      /*
        validateModifiedOnly -> If u have any validations set in the mongoose model
                                then those validators run for only to the properties those who are changing if u set this option to true
    */

      req.userId = existing_user._id;
      next();
    } else {
      const hashedPassword = await genHash(password);
      const modifyObj = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        friends: [
          {
            id: "660bec4a8c09ef88ed8dbad3",
            firstName: "Akhil",
          },
        ],
      };
      const new_user = await User.create(modifyObj);
      req.userId = new_user._id;
      next();
    }
  }
);

export const sendOtp = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = req;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const hashed_Otp = await genHash(otp);

    const otp_expiry_time = Date.now() + 10 * 60 * 1000; //* 10 min

    const modifyObj = { otp: hashed_Otp, otp_expiry_time };

    const user = await User.findByIdAndUpdate({ _id: userId }, modifyObj, {
      new: true,
    });

    if (!user) throw new ApiError(STATUS_NOT_FOUND, "User doesn't exist");

    //Sending Email to the User's Email with the generated otp

    sendMail({
      to: user.email,
      html: otpEmailTemplate(otp),
    });

    res
      .status(200)
      .json(new ApiResponse(STATUS_OK, {}, "Otp sent successfully"));
  }
);

export const verifyOtp = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      otp_expiry_time: { $gt: Date.now() },
    });

    if (!user)
      throw new ApiError(STATUS_NOT_FOUND, "Email is invalid or OTP expired");

    if (!(await user.correctOtp(user.otp, otp)))
      throw new ApiError(STATUS_UNAUTHORIZED, "Otp is incorrect");

    /*
      Here we can even create an obj with both verified and otp fields and save
      their value to the database by using findByIDAndUpdate else we can easily 
      do the same process like this by changing the retrieved user  
  */

    user.verified = true;
    user.otp = undefined;

    /*
      Here generally we have to set an option to save property of mongoose
      validateBeforSave -> false
      this will make sure not to validate before saving as we are setting a 
      value of a field to undefined which will throw an error but as we already 
      set the value of this property as string | undefined in the TS interface
      there is no need in that
  */

    await user.save();

    const { accessToken, refreshToken } = await generateTokens(user._id);

    res
      .status(200)
      .json(
        new ApiResponse(
          STATUS_OK,
          { accessToken, refreshToken },
          "User verified successfully"
        )
      );
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password)
      throw new ApiError(STATUS_BAD_REQUEST, "Email and Password are required");

    const user = await User.findOne({ email });

    if (!user)
      throw new ApiError(STATUS_NOT_FOUND, "Email and Password is incorrect");

    if (!(await user.correctPassword(user.password, password)))
      throw new ApiError(STATUS_UNAUTHORIZED, "Invalid user credentials");

    const { accessToken, refreshToken } = await generateTokens(user._id);
    res
      .status(200)
      .json(
        new ApiResponse(
          STATUS_OK,
          { accessToken, refreshToken },
          "Login Successful"
        )
      );
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    //Get the Email from the User

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new ApiError(STATUS_NOT_FOUND, "User not found");

    const resetToken = await user.createPasswordResetToken();
    /*
      We have to generate a seperate reset token for this
      not the jwt token which used for the authentication
      
      can be crated using packages -> crypto
  */

    const resetURL = `${env.CORS_ORIGIN}/reset-password/${resetToken}`;

    console.log(resetToken);

    sendMail({
      to: user.email,
      html: resetPasswordEmailTemplate(resetURL,user.firstName),
    });



    res
      .status(200)
      .json(new ApiResponse(STATUS_OK, {}, "Reset token sent successfully"));
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { password } = req.body;

    if (!password)
      throw new ApiError(STATUS_BAD_REQUEST, "Password is required");

    const resetToken = req.params.token;

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedResetToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user)
      throw new ApiError(STATUS_NOT_FOUND, "Token is Invalid or Expired");

    const hashedPassword = await genHash(password);

    user.password = hashedPassword;
    user.passwordChangedAt = new Date();
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // TODO => You can send an email about informing the password reset

    const token = genAccessToken(user._id);

    res
      .status(200)
      .json(
        new ApiResponse(STATUS_OK, { accessToken:token }, "Password Reseted Successfully")
      );

    /*
      So here we changed the user's password to the new password 
      and after that we are logging in the user automatically by
      generating the token and sending it to the frontend

      You can do this or you can even ask the user to login with
      the new password again for even more security
  */
  }
);

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.headers.auth as string;

    if (!refreshToken) {
      throw new ApiError(STATUS_BAD_REQUEST, "Refresh Token is required");
    }

    const decodedToken = jwt.verify(
      refreshToken,
      env.JWT_SECRET
    ) as IJWT_PAYLOAD;

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

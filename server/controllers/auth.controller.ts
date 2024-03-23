import { NextFunction, Response, Request } from "express";
import { User } from "../models/index";
import genToken from "../utils/genToken";
import otpGenerator from "otp-generator";
import genHash from "../utils/genHash";
import crypto from "crypto";
import { Types } from "mongoose";
import { sendMail } from "../services/mailer";
import otpEmailTemplate from "../templates/otp";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import {
  STATUS_BAD_REQUEST,
  STATUS_CONFLICT,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "../src/constants";
import { asyncHandler } from "../utils/asyncHandler";

declare module "express-serve-static-core" {
  export interface Request {
    userId?: Types.ObjectId;
  }
}

/**
 * @TESTING
 */

export const getALlUsers = async (req: Request, res: Response) => {
  const response = await User.find({ _id: { $ne: req.userId } })
  res.status(200).json(response);
};

export const getUsersFriends = async (req: Request, res: Response) => {
  const response = await User.findById({ _id: req.userId });
  console.log("Hello");
  res.status(200).json(response?.friends);
};

export const getUser = async (req: Request, res: Response) => {
  const response = await User.findById({ _id: req.userId });
  res.status(200).json(response);
};

export const test = async (req: Request, res: Response) => {
  const response = await User.find();
  res.status(200).json(response);
};



// SignUp => register -> sendOtp -> verifyOtp

export const registerUser = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
    const modifyObj = { firstName, lastName, password };
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
    const modifyObj = { firstName, lastName, email, password: hashedPassword };
    const new_user = await User.create(modifyObj);
    req.userId = new_user._id;
    next();
  }
})

export const sendOtp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId } = req;

  const otp = otpGenerator.generate(6, {
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

  res.status(200).json(new ApiResponse(STATUS_OK, {}, "Otp sent successfully"));
});

export const verifyOtp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
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

  const token = genToken(user._id);

  res
    .status(200)
    .json(new ApiResponse(STATUS_OK, { token }, "User verified successfully"));
});

export const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;


  if (!email || !password)
    throw new ApiError(STATUS_BAD_REQUEST, "Email and Password are required");

  const user = await User.findOne({ email });

  if (!user)
    throw new ApiError(STATUS_NOT_FOUND, "Email is Password is incorrect");

  if (!(await user.correctPassword(user.password, password)))
    throw new ApiError(STATUS_UNAUTHORIZED, "Invalid user credentials");

  const token = genToken(user._id);
  res
    .status(200)
    .json(new ApiResponse(STATUS_OK, { token }, "Login Successful"));
});

export const forgotPassword = asyncHandler(async (
  req: Request,
  res: Response
): Promise<void> => {
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

  try {
    const resetURL = `http:localhost://5173/auth/reset-password/${resetToken}`;

    console.log(resetToken);

    //TODO => SEND EMAIL

    res
      .status(200)
      .json(new ApiResponse(STATUS_OK, {}, "Reset token sent successfully"));
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Some error occured while sending the email",
    });
  }
});

export const resetPassword = asyncHandler(async (
  req: Request,
  res: Response
): Promise<void> => {
  const { password } = req.body;

  if (!password) throw new ApiError(STATUS_BAD_REQUEST, "Password is required");

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

  const token = genToken(user._id);

  res
    .status(200)
    .json(
      new ApiResponse(STATUS_OK, { token }, "Password Reseted Successfully")
    );

  /*
      So here we changed the user's password to the new password 
      and after that we are logging in the user automatically by
      generating the token and sending it to the frontend

      You can do this or you can even ask the user to login with
      the new password again for even more security
  */
});

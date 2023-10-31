import { NextFunction, Response, Request } from "express";
import { User } from "../models/index";
import genToken from "../utils/genToken";
import otpGenerator from "otp-generator";
import genHash from "../utils/genHash";
import { Types } from "mongoose";
// import {Request} from '../interfaces/express'
declare module "express-serve-static-core" {
  export interface Request {
    userId?: Types.ObjectId;
  }
}
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);
  const existing_user = await User.findOne({ email });

  if (existing_user && existing_user.verified) {
    res.status(400).json({
      status: "error",
      message: "Email is already in use.Please login",
    });
  } else if (existing_user) {
    const modifyObj = { firstName, lastName, password };
    await User.findOneAndUpdate({ email }, modifyObj, { new: true });
    req.userId = existing_user._id;
    next();
  } else {
    const hashedPassword = await genHash(password);
    const modifyObj = { firstName, lastName, email, password: hashedPassword };
    const new_user = await User.create(modifyObj);
    req.userId = new_user._id;
    // next();
    res.status(200).json({
      status: "success",
      new_user,
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "email or password is missing",
    });
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(user.password, password))) {
    res.status(400).json({
      status: "error",
      message: "Email or Password is incorrect",
    });
  }

  const token = genToken(user?._id);

  res.status(200).send({
    status: "success",
    message: "Login successful",
    token,
  });
};

export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req;

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const hashed_Otp = await genHash(otp);

  const otp_expiry_time = Date.now() + 10 * 60 * 1000; //* 10 min

  const modifyObj = { otp: hashed_Otp, otp_expiry_time };
  await User.findByIdAndUpdate({ _id: userId }, modifyObj);

  //* TODO Send Email

  res.status(200).json({
    status: "success",
    message: "OTP sent successfully",
  });
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  const user = await User.findOne({
    email,
    otp_expiry_time: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).json({
      status: "error",
      message: "Email is invalid or OTP expired",
    });
  }

  if (!user?.correctOtp(user.otp, otp)) {
    res.status(400).json({
      status: "error",
      message: "Otp is incorrect",
    });
  }

  if (user) {
    user.verified = true;
    user.otp = undefined;
  }
  await user?.save();
};
export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {};
export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {};

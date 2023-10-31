import { Schema, model } from "mongoose";
import {IUser} from '../interfaces/userI'
import bcrypt from 'bcryptjs'
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  about: {
    type: String,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
  },
  verified :{
    type : Boolean,
    default : false
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  otp: {
    type: String,
  },
  otp_expiry_time: {
    type: Date,
  },
});
userSchema.methods.correctPassword = async (password : string,enteredPassword : string) => {
      const match =  await bcrypt.compare(enteredPassword, password)
      return match
}
userSchema.methods.correctOtp = async (otp : string,enteredOtp : string) => {
  const match =  await bcrypt.compare(enteredOtp, otp)
  return match
}

export const User = model<IUser>("User", userSchema);

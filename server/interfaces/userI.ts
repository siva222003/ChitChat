import { Schema, Types } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
  verified: boolean;
  refreshToken: string;
  passwordResetToken: string | undefined;
  passwordResetExpires: number | undefined;
  passwordChangedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  otp: string | undefined;
  otp_expiry_time: Date;
  friends: { id: Types.ObjectId; firstName: string,avatar : string }[];
  notifications: { sender: Types.ObjectId }[];
  socketId: string;
  correctPassword(password: string, enteredPassword: string): Promise<boolean>;
  correctOtp(otp: string | undefined, enteredOtp: string): Promise<boolean>;
  createPasswordResetToken(): Promise<string>;
  passwordChangedAfter(timestamp: number): boolean;
}

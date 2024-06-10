import { Schema, Types } from "mongoose";

export interface IMessage {
    sender: Types.ObjectId;
    message: string;
    chat: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    status: string;
  }
  
import { Schema } from "mongoose";

export interface IMessage {
    sender: Schema.Types.ObjectId;
    message: string;
    chat: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    status: string;
  }
  
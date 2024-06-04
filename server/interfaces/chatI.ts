import { Schema } from "mongoose";

export interface IChat {
    isGroupChat: boolean;
    participants: Schema.Types.ObjectId[];
    lastMessage: Schema.Types.ObjectId;
    messages: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
  }

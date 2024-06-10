import { Schema, Types } from "mongoose";

export interface IChat {
    isGroupChat: boolean;
    participants: Types.ObjectId[];
    lastMessage: Types.ObjectId;
    messages: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
  }

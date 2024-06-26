import { Schema, Types } from "mongoose";

export interface IChat {
    isGroupChat: boolean;
    isArchived: boolean;
    members: Types.ObjectId[];
    lastMessage: string;
    messages: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
  }

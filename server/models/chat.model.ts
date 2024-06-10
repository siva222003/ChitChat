import mongoose, { Schema, Types, model } from "mongoose";
import { IChat } from "../interfaces/chatI";

//create a chat schema

const chatSchema = new mongoose.Schema(
  {
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
    },
    participants: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: Types.ObjectId,
      ref: "Message",
    },
    messages: [
      {
        type: Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

export const Chat = model<IChat>("Chat", chatSchema);

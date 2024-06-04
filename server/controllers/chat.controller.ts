import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { STATUS_BAD_REQUEST } from "../src/constants";
import { User } from "../models";
import { Chat } from "../models/chat.model";
import { ApiResponse } from "../utils/ApiResponse";

/*---------------- Get All Chats of a User  ------------------*/

export const getAllChats = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    
    const userId = req.userId;
    const chats = await Chat.find(
      { members: userId },
      { isGroupChat: false }
    ).populate("members", "firstName");

    if (!chats) {
      throw new ApiError(STATUS_BAD_REQUEST, "No chats found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, chats, "Successfully retrieved all chats"));
  }
);

export const getChat = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate("messages");

    if (!chat) {
      throw new ApiError(STATUS_BAD_REQUEST, "Chat not found");
    }
    res.status(200).json(chat);
  }
);

//delete chat
//create message
//edit message
//delete message

//create group
//delete group
//add member to group
//remove member from group

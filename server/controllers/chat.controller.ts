import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { STATUS_BAD_REQUEST, STATUS_OK } from "../src/constants";
import { User } from "../models";
import { Chat } from "../models/chat.model";
import { ApiResponse } from "../utils/ApiResponse";
import { Message } from "../models/message.model";

/*---------------------- @CHATS ---------------------*/

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

/*---------------- Get Chat  ------------------*/

export const getChat = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate("messages");

    if (!chat) {
      throw new ApiError(STATUS_BAD_REQUEST, "Chat not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, chat, "Successfully retrieved chat"));
  }
);

/*---------------- Delete Chat  ------------------*/

/*---------------------- @MESSAGES ---------------------*/

//create message
//edit message
//delete message

export const createMessage = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { chatId, message } = req.body;
    const userId = req.userId;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new ApiError(STATUS_BAD_REQUEST, "Chat not found");
    }

    const newMessage = new Message({
      sender: userId,
      chat: chatId,
      message,
      status: "sent",
    });

    await newMessage.save();

    chat.messages.push(newMessage._id);
    await chat.save();

    res
      .status(200)
      .json(
        new ApiResponse(STATUS_OK, newMessage, "Message sent successfully")
      );
  }
);

/*---------------------- @GROUPS ---------------------*/
//create group
//rename group
//delete group
//add admin
//add member to group
//remove member from group
//exit group

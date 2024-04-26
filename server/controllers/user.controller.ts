import { User } from "../models";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { STATUS_NOT_FOUND } from "../src/constants";
import { ApiError } from "../utils/ApiError";

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const users = await User.find({});

    res
      .status(200)
      .json(new ApiResponse(200, users, "Successfully retrieved all users"));
  }
);

export const getUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.userId;
    const user = await User.findById(id).select(
      "-password -refreshToken -otp -otp_expiry_time"
    );

    if (!user) {
      throw new ApiError(STATUS_NOT_FOUND, "User not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, user, "Successfully retrieved user"));
  }
);

export const addFriend = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.userId;
    const { friendId } = req.body;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      throw new ApiError(STATUS_NOT_FOUND, "User or Friend not found");
    }

    user.friends.push({
      id: friendId,
      firstName: friend.firstName,
    });
    await user.save();
    res.json(new ApiResponse(200, {}, "Friend added successfully"));
  }
);

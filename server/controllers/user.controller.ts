import { User } from "../models";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { STATUS_CONFLICT, STATUS_NOT_FOUND, STATUS_OK } from "../src/constants";
import { ApiError } from "../utils/ApiError";
import FriendRequest from "../models/request.model";
import { Chat } from "../models/chat.model";

/*---------------- Get All Users  ------------------*/

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {

    const users = await User.find().select(
      "firstName about avatar"
    );

    res
      .status(200)
      .json(new ApiResponse(200, users, "Successfully retrieved all users"));
  }
);

/*---------------- Get User Details  ------------------*/

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
/*---------------- Send Friend Request  ------------------*/

export const sendFriendRequest = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.userId;
    const { friendId } = req.body;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      throw new ApiError(STATUS_NOT_FOUND, "User or Friend not found");
    }

    const existingFriendRequest = await FriendRequest.findOne({
      sender: id,
      receiver: friendId,
    });

    if (existingFriendRequest) {
      throw new ApiError(STATUS_CONFLICT, "Friend request already sent");
    }

    user.friends.push({
      id: friendId,
      firstName: friend.firstName,
    });
    await user.save();
    res.json(new ApiResponse(200, {}, "Friend added successfully"));
  }
);

/*---------------- Accept or Reject Friend Request  ------------------*/

export const acceptFriendRequest = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.userId;
    const { friendId, accept } = req.body;

    if (!id || !friendId) {
      throw new ApiError(STATUS_NOT_FOUND, "User or Friend not found");
    }

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      throw new ApiError(STATUS_NOT_FOUND, "User or Friend not found");
    }

    const friendRequest = await FriendRequest.findOne({
      sender: friendId,
      receiver: id,
    });

    if (!friendRequest) {
      throw new ApiError(STATUS_NOT_FOUND, "Friend request not found");
    }

    if (!accept) {
      await friendRequest.deleteOne();
      res.json(new ApiResponse(STATUS_OK, {}, "Friend request rejected"));
      return;
    }

    user.friends.push({
      id: friendId,
      firstName: friend.firstName,
    });

    friend.friends.push({
      id: id,
      firstName: user.firstName,
    });

    await Promise.all([user.save(), friend.save(), friendRequest.deleteOne()]);

    await Chat.create({
      members: [id, friendId],
    });

    res.json(new ApiResponse(STATUS_OK, {}, "Friend request accepted"));
  }
);

/*---------------- Remove Friend Friends  ------------------*/

export const removeFriend = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.userId;
    const { friendId } = req.body;

    if (!id || !friendId) {
      throw new ApiError(STATUS_NOT_FOUND, "User or Friend not found");
    }

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      throw new ApiError(STATUS_NOT_FOUND, "User or Friend not found");
    }

    user.friends = user.friends.filter((friend) => friend.id !== friendId);
    friend.friends = friend.friends.filter((friend) => friend.id !== id);

    await Promise.all([user.save(), friend.save()]);

    res.json(new ApiResponse(STATUS_OK, {}, "Friend removed successfully"));
  }
);



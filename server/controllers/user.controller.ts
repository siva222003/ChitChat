import { User } from "../models";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ACCEPT_REQUEST, FRIEND_REQUEST, STATUS_CONFLICT, STATUS_NOT_FOUND, STATUS_OK } from "../src/constants";
import { ApiError } from "../utils/ApiError";
import FriendRequest from "../models/request.model";
import { Chat } from "../models/chat.model";
import { io } from "../src/server";
import { onlineUserIds } from "../src/socket";

/*---------------- Get All Users  ------------------*/

export const getAllUsersExceptFriends = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.userId;
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(STATUS_NOT_FOUND, "User not found");
    }

    const users = await User.find({
      _id: { $nin: [...user.friends.map((friend) => friend.id), id] },
    }).select("firstName about avatar");

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          users,
          "Successfully retrieved all users except friends"
        )
      );
  }
);

/*---------------- Get User Details  ------------------*/

export const getUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.userId;
    const user = await User.findById(id).select(
      "-password -refreshToken -otp -otp_expiry_time -passwordChangedAt -passwordResetToken -passwordResetExpires -verified -__v"
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

    const friendRequest = new FriendRequest({
      sender: id,
      receiver: friendId,
    });

    await friendRequest.save();

    friend.notifications.push({
      sender: user._id,
    });

    await friend.save();
    res.json(new ApiResponse(200, {}, "Friend Requset Sent successfully"));

    io.to(onlineUserIds.get(friendId) as string).emit(FRIEND_REQUEST, {
      notifications: friend.notifications,
    });
  }
);

/*---------------- Accept or Reject Friend Request  ------------------*/

export const acceptFriendRequest = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.userId;
    const { friendId, accept } = req.body;

    if (!id || !friendId) {
      throw new ApiError(STATUS_NOT_FOUND, "User ID or Friend ID not found");
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
      user.notifications = user.notifications.filter(
        (notification) => notification.sender.toString() !== friendId
      );
      await user.save();
      res.json(
        new ApiResponse(
          STATUS_OK,
          { notifications: user.notifications },
          "Friend request rejected"
        )
      );
      return;
    }

    user.friends.push({
      id: friendId,
      firstName: friend.firstName,
      avatar: friend.avatar,
    });

    user.notifications = user.notifications.filter(
      (notification) => notification.sender.toString() !== friendId
    );

    friend.friends.push({
      id: id,
      firstName: user.firstName,
      avatar: user.avatar,
    });

    await Promise.all([user.save(), friend.save(), friendRequest.deleteOne()]);

    await Chat.create({
      members: [id, friendId],
    });

    res.json(new ApiResponse(STATUS_OK,  { notifications: user.notifications }, "Friend request accepted"));

    const friendSocketId = onlineUserIds.get(friendId) as string;
    const userSocketId = onlineUserIds.get(id.toString()) as string;
    console.log(friendSocketId, userSocketId)
    const socketIds = [friendSocketId, userSocketId];

    io.to(socketIds).emit(ACCEPT_REQUEST, {
      notifications: user.notifications,
    });
  }
);

/*---------------- Remove Friend ------------------*/

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



/*---------------- Get All Notifications  ------------------*/

export const getNotifications = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.userId;
    const user = await User.findById(id).populate({
      path: "notifications.sender",
      select: "firstName avatar",
    });

    if (!user) {
      throw new ApiError(STATUS_NOT_FOUND, "User not found");
    }

    res.json(
      new ApiResponse(
        STATUS_OK,
        user.notifications,
        "Notifications retrieved successfully"
      )
    );
  }
);

/*---------------- Get All Users  ------------------*/

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const users = await User.find({}).select(
      "firstName about friends notifications email"
    );
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          users,
          "Successfully retrieved all users except friends"
        )
      );
  }
);

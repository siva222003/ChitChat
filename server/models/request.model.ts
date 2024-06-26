import { Schema, model, Document } from "mongoose";
import { IFriendRequest } from "../interfaces/requestI";

const friendRequestSchema = new Schema<IFriendRequest>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const FriendRequest = model<IFriendRequest>(
  "FriendRequest",
  friendRequestSchema
);
export default FriendRequest;

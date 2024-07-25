import mongoose from "mongoose";
import env from "../utils/validateEnv";
import { userSchema } from "../models/user.model";
import { IUser } from "../interfaces/userI";
const MONGO_URI = env.MONGO_URI;

export const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MONG0DB CONNECTED");
  } catch (err) {
    console.log("Some Error occured in DB connection", err);
    process.exit(1);
  }
};

export class DbService {
  private readonly _db: mongoose.Connection;

  constructor() {
    this._db = mongoose.connection;
  }

  async connect() {
    mongoose.connect(MONGO_URI);
    console.log("MONG0DB CONNECTED");
  }

  get userModel() {
    return this._db.model<IUser>("User", userSchema);
  }
}

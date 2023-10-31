import mongoose from "mongoose";
import env from '../utils/validateEnv'
const MONGO_URI = env.MONGO_URI;

export const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MONG0DB CONNECTED");
  } catch (err) {
    throw new Error('Some Error occured in DB connection')
  }
};
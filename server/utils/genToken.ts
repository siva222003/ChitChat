import jwt from "jsonwebtoken";
import env from "./validateEnv";
import { Types } from "mongoose";

/**
 * Generate a json web token for a user
 * @param id The id of the user
 */

const genToken = (id : Types.ObjectId | undefined) => {

  if (!id) {
    throw new Error("User ID is undefined");
  }

  const jwtOptions = {
    expiresIn: "7d", // Token expires in 7 day
  };
  const token = jwt.sign({ id }, env.JWT_SECRET, jwtOptions);
  return token;
};

export default genToken
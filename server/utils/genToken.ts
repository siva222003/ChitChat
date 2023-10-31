import jwt from "jsonwebtoken";
import env from "./validateEnv";
import { Types } from "mongoose";

/**
 * Generate a json web token for a user
 * @param id The id of the user
 */

const genToken = (id : Types.ObjectId | undefined) => {
  const jwtOptions = {
    expiresIn: "7d", // Token expires in 1 day
  };
  const token = jwt.sign({ id }, env.JWT_SECRET, jwtOptions);
  return token;
};

export default genToken
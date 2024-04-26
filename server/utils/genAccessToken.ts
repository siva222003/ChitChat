import jwt from "jsonwebtoken";
import env from "./validateEnv";
import { Types } from "mongoose";

/**
 * Generate an access token for a user
 * @param id The id of the user
 */

const genAccessToken = (id : Types.ObjectId | undefined) => {

  if (!id) {
    throw new Error("User ID is undefined");
  }

  const jwtOptions = {
    expiresIn: env.ACCESS_TOKEN_EXPIRY, 
  };
  const token = jwt.sign({ id }, env.JWT_SECRET, jwtOptions);
  return token;
};

export default genAccessToken
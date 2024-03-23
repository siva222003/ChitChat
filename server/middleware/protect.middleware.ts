import jwt from "jsonwebtoken";
import env from "../utils/validateEnv";
import { NextFunction, Request, Response } from "express";
import { IJWT_PAYLOAD } from "../interfaces/tokenI";
import { User } from "../models";

//MIDDLEWARE FOR CHECKING WHETHER THE TOKEN IS PRESENT AND VALID AND NOT EXPIRED

export const verify = (req: Request, res: Response, next: NextFunction) => {
  const webToken = req.headers.auth as string;
  const JWT_SECRET = env.JWT_SECRET;

  if (!webToken) {
    return res.status(400).json({ error: "Couldn't find the token" });
  }

  const [bearer, token] = webToken.split(" ");
  
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token format" });
  }
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err)
      // Token is invalid or expired
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token expired. Please log in again." });
      }
      return res
        .status(401)
        .json({ message: "Invalid token. Please provide a valid token." });

    }
    const decodedUser = decoded as IJWT_PAYLOAD;

    const user = await User.findById(decodedUser.id);

    if (!user) {
      res.status(400).json({
        status: "error",
        message: "User doesn't exist",
      });

      return;
    }

    // if (user.passwordChangedAfter((decodedUser.iat)!)) {
    //  return res.status(400).json({
    //     status: "error",
    //     message: "Password has been updated recently.Please login again",
    //   });
    // }

    req.userId = decodedUser.id;

    next();
  });
};

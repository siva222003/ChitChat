import express from "express";
import { addFriend, getAllUsers, getUser } from "../controllers/user.controller";
import { verify } from "../middleware/protect.middleware";

const router = express.Router();

router.get("/all", verify, getAllUsers);
router.get("/me", verify, getUser);
router.post("/add-friend", verify,addFriend )

export default router;

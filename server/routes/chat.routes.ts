import express from "express";

import { verify } from "../middleware/protect.middleware";
import { getAllChats, getChat, sendMessage } from "../controllers/chat.controller";
const router = express.Router();


/*------- Chat Routes --------- */
router.get("/", verify, getAllChats);
router.get("/:chatId", verify, getChat);


/*------- Message Routes --------- */
router.post("/:chatId", verify, sendMessage);



export default router;

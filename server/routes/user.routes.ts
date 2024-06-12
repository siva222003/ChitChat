import express from "express";
import {
  sendFriendRequest,
  getAllUsersExceptFriends,
  getUser,
  getNotifications,
  getAllUsers,
  acceptFriendRequest,
} from "../controllers/user.controller";
import { verify } from "../middleware/protect.middleware";

const router = express.Router();

/*-----  Get User Data ----- */
router.get("/all", verify ,getAllUsersExceptFriends);
router.get("/me", verify, getUser);




/*------ Friend Request --------- */
router.post("/add-friend", verify, sendFriendRequest);
router.post("/accept-friend", verify, acceptFriendRequest);


/*------ Notifications --------- */
router.get("/notifications", verify, getNotifications);

//testing
router.get("/all-users", getAllUsers);

export default router;

import express from "express";
import {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  getALlUsers,
  getUsersFriends,
  getUser,
  test,
} from "../controllers/auth.controller";
import { verify } from "../middleware/protect.middleware";
const router = express.Router();

//TESTING
router.get('/all',verify,getALlUsers)
router.get('/friends',verify,getUsersFriends)
router.get('/user',verify,getUser)
router.get('/test',test)

router.post('/register',registerUser,sendOtp)
router.post('/login',loginUser)

router.post('/send-otp',sendOtp)
router.post('/verify-otp',verifyOtp)

router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)

export default router
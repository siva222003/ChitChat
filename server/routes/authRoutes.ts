import express from "express";
import {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";
const router = express.Router();
router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/send-otp',sendOtp)
router.post('/verify-otp',verifyOtp)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password',resetPassword)

export default router
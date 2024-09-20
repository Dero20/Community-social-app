import express from "express";
import {
  forgotPassword,
  getNearbyUsers,
  getProfile,
  getSingleProfile,
  getUserInbox,
  getUserNotifications,
  login,
  register,
  resetPassword,
  updateProfile,
  verifyOtp,
} from "../controllers/AuthController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register);

router.post("/verify-otp", verifyOtp);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.get("/profile", verifyToken, getProfile);

router.get("/single-profile/:id", verifyToken, getSingleProfile);

router.put("/profile-update", verifyToken, updateProfile);

router.put("/get-inbox", verifyToken, getUserInbox);

router.get('/nearby', verifyToken, getNearbyUsers)

router.get('/notifications', verifyToken, getUserNotifications)

export default router;

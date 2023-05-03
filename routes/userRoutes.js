import express from "express";
import {
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

// To Register a new user
router.route("/register").post(register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);

// Get my Profile
router.route("/me").get(isAuthenticated, getMyProfile);

// Change Password
// UpdateProfile
// UpdateProfilePicture

// ForgetPassword
// ResetPassword

// AddToPlayList
// RemoveFromPlaylist

export default router;

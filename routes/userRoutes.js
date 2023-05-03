import express from "express";
import { login, logout, register } from "../controllers/userController.js";
const router = express.Router();

// To Register a new user
router.route("/register").post(register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);

// Get my Profile

// Change Password
// UpdateProfile
// UpdateProfilePicture

// ForgetPassword
// ResetPassword

// AddToPlayList
// RemoveFromPlaylist

export default router;

import express from "express";
import {
  addToPlaylist,
  changePassword,
  forgetPassword,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePicture,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
import singleUpload from "../middleware/multer.js";
const router = express.Router();

// To Register a new user
router.route("/register").post(singleUpload, register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);

// Get my Profile
router.route("/me").get(isAuthenticated, getMyProfile);

// Change Password
router.route("/changepassword").put(isAuthenticated, changePassword);

// UpdateProfile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// UpdateProfilePicture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);

// ForgetPassword
router.route("/forgetpassword").post(forgetPassword);

// ResetPassword
router.route("/resetpassword/:token").put(resetPassword);

// AddToPlayList
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// RemoveFromPlaylist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

export default router;

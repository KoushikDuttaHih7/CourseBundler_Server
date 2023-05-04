import express from "express";
import {
  addCourseLecture,
  createCourse,
  getAllCourse,
  getCourseLecture,
} from "../controllers/courseController.js";
import singleUpload from "../middleware/multer.js";
const router = express.Router();

// Get All Courses without Lectures
router.route("/courses").get(getAllCourse);

// Create new course - only Admin
router.route("/createcourse").post(singleUpload, createCourse);

// Get Course Details
router.route("/course/:id").get(getCourseLecture);

// Add Lecture, Delete Course,
router.route("/course/:id").post(singleUpload, addCourseLecture);

// Delete Lecture

export default router;

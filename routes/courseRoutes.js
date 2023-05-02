import express from "express";
import { createCourse, getAllCourse } from "../controllers/courseController.js";
const router = express.Router();

// Get All Courses without Lectures
router.route("/courses").get(getAllCourse);

// Create new course - only Admin
router.route("/createcourse").post(createCourse);

// Add Lecture, Delete Course, Get Course Details

// Delete Lecture

export default router;

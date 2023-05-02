import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Course } from "../models/CourseModel.js";

export const getAllCourse = catchAsyncError(async (req, res, next) => {
  const courses = await Course.find();
  res.status(200).json({
    success: true,
    courses,
  });
});

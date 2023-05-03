import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { User } from "../models/UserModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  // const file = req.file

  if (!name || !email || !password)
    return next(new ErrorHandler("Please enter all fields ", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User already exists", 409));

  // Upload file on cloudinary

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "tempid",
      url: "tempurl",
    },
  });

  sendToken(res, user, "Registered Successfully", 201);
});

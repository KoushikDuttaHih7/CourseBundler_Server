import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { instance } from "../server.js";
import { User } from "../models/UserModel.js";
import { Payment } from "../models/PaymentModel.js";
import crypto from "crypto";

// Buy Subscription
export const buySubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role === "admin")
    return next(
      new ErrorHandler("Admin doesnot have to buy Subscription", 400)
    );

  const plan_id = process.env.PLAN_ID;
  const subscription = await instance.subscriptions.create({
    plan_id,
    customer_notify: 1,
    total_count: 12,
  });

  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;

  await user.save();

  res.status(201).json({
    success: true,
    subscriptionID: subscription.id,
  });
});

// Payment Verification and Save reference in Database
export const paymentVerification = catchAsyncError(async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const user = await User.findById(req.user._id);

  const subscription_id = user.subscription.id;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
    .digest("hex");

  const isAuthentic = generated_signature === razorpay_signature;
  if (!isAuthentic) res.redirect(`${process.env.FRONTEND_URL}/paymentfail`);

  // Database coms here
  await Payment.create({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  });

  user.subscription.status = "active";

  await user.save();

  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference${razorpay_payment_id}`
  );
});

// Get RazorPay Key
export const getRazorPayKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    Key: process.env.RAZORPAY_API_KEY,
  });
});

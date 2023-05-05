import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  buySubscription,
  getRazorPayKey,
  paymentVerification,
} from "../controllers/paymenyController.js";
const router = express.Router();

// Buy Subscription
router.route("/subscribe").get(isAuthenticated, buySubscription);

// Payment Verification
router.route("/paymentverification").post(isAuthenticated, paymentVerification);

// Get RazorPay Key
router.route("/razorpaykey").get(getRazorPayKey);

export default router;

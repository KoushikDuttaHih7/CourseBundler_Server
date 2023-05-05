import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { buySubscription } from "../controllers/paymenyController.js";
const router = express.Router();

// Buy Subscription
router.route("/subscribe").get(isAuthenticated, buySubscription);

export default router;

import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middleware/ErrorMiddleware.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// All Routes Import
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";

// All Routes prefix
app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);

export default app;

app.use(ErrorMiddleware);

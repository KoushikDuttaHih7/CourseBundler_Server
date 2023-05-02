import express from "express";
import dotenv from "dotenv";
import ErrorMiddleware from "./middleware/ErrorMiddleware.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All Routes Import
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";

// All Routes prefix
app.use("/api/v1", course);
app.use("/api/v1", user);

export default app;

app.use(ErrorMiddleware);

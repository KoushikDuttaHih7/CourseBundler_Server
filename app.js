import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// All Routes Import
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";

// All Routes prefix
app.use("/api/v1", course);
app.use("/api/v1", user);

export default app;

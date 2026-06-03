import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import moduleRoutes from "./routes/module.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/module", moduleRoutes);
app.use("/progress", progressRoutes);
app.use("/user", userRoutes);

export default app;

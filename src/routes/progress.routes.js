import { Router } from "express";
import {
  getProgress,
  updateProgress,
} from "../controllers/progress.controller.js";

const router = Router();

// Get user progress
router.get("/", getProgress);

// Update user progress
router.post("/", updateProgress);

export default router;

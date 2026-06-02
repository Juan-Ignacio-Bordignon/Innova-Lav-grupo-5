import { Router } from "express";
import {
  getProgress,
  updateProgress,
} from "../controllers/progress.controller.js";

const router = Router();

// Get user progress
router.get("/:userId", getProgress);

// Update user progress
router.post("/:userId", updateProgress);

export default router;

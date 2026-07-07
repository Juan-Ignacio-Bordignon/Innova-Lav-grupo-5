import { Router } from "express";
import {
  getProgress,
  updateProgress,
  saveProgress, //  importación 
} from "../controllers/progress.controller.js";

const router = Router();

// Get user progress
router.get("/", getProgress);

// Update user progress
router.post("/", updateProgress);

// Save exercise and points progress (Semana 8 - MVP)
router.post("/save", saveProgress); //  nueva ruta 

export default router;
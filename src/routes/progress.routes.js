import { Router } from "express";
import {
  getProgress,
  saveProgress
} from "../controllers/progress.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Obtener el progreso general del usuario
router.get("/", authMiddleware, getProgress);

// Guardar y resolver ejercicio o teoría (Mapeado a /save-resolved y /save por compatibilidad)
router.post("/save", authMiddleware, saveProgress);
router.post("/save-resolved", authMiddleware, saveProgress);

export default router;
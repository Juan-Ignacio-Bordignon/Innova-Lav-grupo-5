import { Router } from "express";
import {
  getProgress,
  saveProgress
} from "../controllers/progress.controller.js";

const router = Router();

// Obtener el progreso general del usuario
router.get("/", getProgress);

// Guardar y resolver ejercicio o teoría (Mapeado a /save-resolved y /save por compatibilidad)
router.post("/save", saveProgress);
router.post("/save-resolved", saveProgress);

export default router;
import { Router } from "express";
import {
  getModules,
  getLessons,
  getLesson,
} from "../controllers/module.controller.js";

const router = Router();

router.get("/", getModules);
router.get("/:moduleId/lessons", getLessons);
router.get("/:moduleId/lessons/:lessonId", getLesson);

export default router;

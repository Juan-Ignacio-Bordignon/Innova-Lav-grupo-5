import { Router } from "express";
import { getModules } from "../controllers/module.controller.js";
import { getLessons, getLesson } from "../controllers/lesson.controller.js";
import { getExercises } from "../controllers/exercise.controller.js";

const router = Router();

router.get("/", getModules);
router.get("/:moduleId/lessons", getLessons);
router.get("/:moduleId/lessons/:lessonId", getLesson);
router.get("/:moduleId/lessons/:lessonId/exercises", getExercises);

export default router;

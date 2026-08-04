import { Router } from "express";
import {
  getEventLogs,
  postEventLog,
} from "../controllers/event-log.controller.js";

const router = Router();

router.get("/", getEventLogs);
router.post("/", postEventLog);

export default router;

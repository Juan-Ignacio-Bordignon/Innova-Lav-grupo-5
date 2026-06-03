import { Router } from "express";
import { userById } from "../controllers/user.controller.js";

const router = Router();

router.get("/:userId", userById);

export default router;

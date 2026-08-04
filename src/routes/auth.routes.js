import { Router } from "express";
import { postRegister, postLogin } from "../controllers/auth.controller.js";
import {
  registerValidation,
  loginValidation,
} from "../validators/auth.validator.js";
import { validateFields } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/register", registerValidation, validateFields, postRegister);
router.post("/login", loginValidation, validateFields, postLogin);

export default router;

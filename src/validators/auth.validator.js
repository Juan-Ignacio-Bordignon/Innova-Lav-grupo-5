import { body } from "express-validator";

export const registerValidation = [
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio"),

  body("email").trim().isEmail().withMessage("Debe ingresar un email válido"),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const loginValidation = [
  body("email").trim().isEmail().withMessage("Email inválido"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
];

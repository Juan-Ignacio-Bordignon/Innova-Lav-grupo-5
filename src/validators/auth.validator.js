import { body } from "express-validator";
// Validaciones para el registro de usuarios
export const registerValidation = [
  // Validar que el nombre no esté vacío y eliminar espacios en blanco
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio"),

  // Validar que el email tenga un formato válido y eliminar espacios en blanco
  body("email").trim().isEmail().withMessage("Debe ingresar un email válido"),

  // Validar que la contraseña tenga al menos 6 caracteres y eliminar espacios en blanco
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

// Validaciones para el inicio de sesión de usuarios
export const loginValidation = [
  // Validar que el email tenga un formato válido y eliminar espacios en blanco
  body("email").trim().isEmail().withMessage("Email inválido"),

  // Validar que la contraseña no esté vacía y eliminar espacios en blanco
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
];

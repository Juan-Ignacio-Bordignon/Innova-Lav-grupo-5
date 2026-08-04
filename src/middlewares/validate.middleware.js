import { validationResult } from "express-validator";

// Middleware para validar los campos de entrada
export const validateFields = (req, res, next) => {
  // Obtener los errores de validación
  const errors = validationResult(req);

  // Si hay errores, responder con un error de validación
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  // Si no hay errores, continuar con la siguiente función de middleware o ruta
  next();
};

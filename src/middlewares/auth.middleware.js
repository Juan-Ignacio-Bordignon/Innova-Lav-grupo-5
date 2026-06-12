import jwt from "jsonwebtoken";

// Middleware de autenticación para proteger rutas
export const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers.authorization;

  //Verificar si el token está presente
  if (!authHeader) {
    return res.status(401).json({
      message: "Token requerido",
    });
  }
  // El token se espera en el formato "Bearer <token>"
  const token = authHeader.split(" ")[1];
  // Verificar el token JWT
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar la información del usuario al objeto de solicitud
    req.user = payload;

    // Continuar con la siguiente función de middleware o ruta
    next();
  } catch {
    // Si el token no es válido, responder con un error de autenticación
    return res.status(401).json({
      message: "Token inválido",
    });
  }
};

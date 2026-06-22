import jwt from "jsonwebtoken";

// Función para generar un token JWT con el ID del usuario
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Función para verificar un token JWT y extraer su contenido
export const verifyToken = (token) => {
  //quiero devolver el id del usuario que esta en el token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

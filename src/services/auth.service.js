import { generateToken, verifyToken } from "../utils/jws.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const register = async (userData) => {
  const { nombre, email, password } = userData;

  // Validar campos requeridos
  if (!email || !password || !nombre) {
    throw new Error(
      "Faltan campos requeridos - nombre, email y password son obligatorios",
    );
  }

  // Verificar si el usuario ya existe
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error("El correo electrónico ya está en uso");
  }

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear el usuario en la base de datos
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      nombre,
      ultimaActividad: new Date(),
    },
  });

  // Generar token JWT
  const token = generateToken(user.id);

  return { user, token };
};

export const login = async (userData) => {
  const { email, password } = userData;

  // Validar campos requeridos
  if (!email || !password) {
    throw new Error("Faltan campos requeridos");
  }

  // Verificar si el usuario existe
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Credenciales inválidas");
  } else {
    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Credenciales inválidas");
    } else {
      // Generar token JWT
      const token = generateToken(user.id);
      return { token };
    }
  }
};

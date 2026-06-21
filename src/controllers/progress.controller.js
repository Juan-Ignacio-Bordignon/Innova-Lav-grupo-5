import { PrismaClient } from "@prisma/client";
import { calcularNuevaRacha } from "../utils/racha.utils.js";

const prisma = new PrismaClient();

// GET /progress/:userId
export const getProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    const progreso = await prisma.progreso.findMany({
      where: { userId: parseInt(userId) },
      include: { leccion: true },
    });

    res.json({ progreso });
  } catch (e) {
    res.status(500).json({ error: "No se pudo obtener el progreso del usuario" });
  }
};

// POST /progress/:userId
export const updateProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { moduloId, leccionId } = req.body;

    const userIdInt = parseInt(userId);

    // 1. Guardamos el progreso de la lección completada
    const nuevoProgreso = await prisma.progreso.create({
      data: {
        userId: userIdInt,
        moduloId: parseInt(moduloId),
        leccionId: parseInt(leccionId),
      },
    });

    // 2. Buscamos el usuario para calcular su racha
    const user = await prisma.user.findUnique({
      where: { id: userIdInt },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // 3. Calculamos cómo queda la racha
    const { rachaActual, ultimaActividad } = calcularNuevaRacha(
      user.ultimaActividad,
      user.rachaActual
    );

    // 4. Actualizamos al usuario con la nueva racha
    const userActualizado = await prisma.user.update({
      where: { id: userIdInt },
      data: { rachaActual, ultimaActividad },
    });

    res.json({
      mensaje: "Progreso actualizado exitosamente",
      progreso: nuevoProgreso,
      rachaActual: userActualizado.rachaActual,
    });
  } catch (e) {
    res.status(500).json({ error: "No se pudo actualizar el progreso del usuario" });
  }
};
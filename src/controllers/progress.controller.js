import { PrismaClient } from "@prisma/client";
import { calcularNuevaRacha } from "../utils/racha.utils.js";
import { verifyToken } from "../utils/jws.js";

const prisma = new PrismaClient();

// GET /progress
export const getProgress = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = verifyToken(token);

    const progreso = await prisma.progreso.findMany({
      where: { userId: parseInt(userId) },
      select: {
        moduloId: true,
        modulo: {
          select: {
            nombre: true,
          },
        },
        leccionId: true,
        leccion: {
          select: {
            titulo: true,
          },
        },
        ejercicioId: true,
        ejercicio: {
          select: {
            titulo: true,
          },
        },
        errores: true,
        puntos: true,
        primerIntento: true,
        completadoEn: true,
      },
    });

    res.json({ progreso });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "No se pudo obtener el progreso del usuario" });
  }
};

// POST /progress
export const updateProgress = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = verifyToken(token);
    const { moduloId, leccionId, exerciseId } = req.body;

    const userIdInt = parseInt(userId);

    // 1. Buscamos el usuario para asegurarnos que existe
    const user = await prisma.user.findUnique({
      where: { id: userIdInt },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // 2. Guardamos el progreso de la lección completada
    const nuevoProgreso = await prisma.progreso.create({
      data: {
        userId: userIdInt,
        moduloId: parseInt(moduloId),
        leccionId: parseInt(leccionId),
        ejercicioId: parseInt(exerciseId),
      },
    });

    // 3. Calculamos cómo queda la racha
    const { rachaActual, ultimaActividad } = calcularNuevaRacha(
      user.ultimaActividad,
      user.rachaActual,
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
    res
      .status(500)
      .json({ error: "No se pudo actualizar el progreso del usuario" });
  }

export const saveProgress = async (req, res) => {
  try {
    const { userId, lessonId, exerciseId, isCorrect } = req.body;

    // TODO: Ajustar las consultas Prisma una vez que acordemos el esquema .
    // Por ahora mockeamos la respuesta para habilitar el desarrollo del Frontend.
    const mockResultado = {
      message: "Progreso recibido y procesado en Backend (Sprint Semana 8)",
      puntosGanados: isCorrect ? 10 : 2,
      rachaActual: 3, 
      status: "success"
    };

    return res.status(200).json(mockResultado);
  } catch (error) {
    console.error("Error en saveProgress:", error);
    return res.status(500).json({ error: "Error interno al procesar el progreso del MVP" });
  }
};

};


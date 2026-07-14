import { PrismaClient } from "@prisma/client";
import { calcularNuevaRacha } from "../utils/racha.utils.js";
import { verifyToken } from "../utils/jws.js";

const prisma = new PrismaClient();

// GET /progress - Obtener el historial de progreso del usuario
export const getProgress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token no provisto" });
    }
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

// POST /progress - Guardar el progreso de una lección completada por el usuario
export const updateProgress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token no provisto" });
    }
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

    // 2. Guardamos el progreso
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
    console.error(e);
    res
      .status(500)
      .json({ error: "No se pudo actualizar el progreso del usuario" });
  }
};

// POST /progress/save-resolved - Guardar el progreso real de una respuesta 
export const saveProgress = async (req, res) => {
  try {
    const { userId, moduloId, lessonId, exerciseId, isCorrect } = req.body;

    if (!userId || !lessonId || !exerciseId) {
      return res.status(400).json({ error: "Faltan parámetros requeridos (userId, lessonId, exerciseId)." });
    }

    const userIdInt = parseInt(userId);
    const puntosGanados = isCorrect ? 10 : 2;

    // 1. Buscamos al usuario para ver su racha actual
    const user = await prisma.user.findUnique({
      where: { id: userIdInt }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // 2. Registramos el intento en la tabla progreso
    const nuevoRegistro = await prisma.progreso.create({
      data: {
        userId: userIdInt,
        moduloId: parseInt(moduloId) || 1, // Por defecto al módulo 1 si no viene
        leccionId: parseInt(lessonId),
        ejercicioId: parseInt(exerciseId),
        puntos: puntosGanados,
        errores: isCorrect ? 0 : 1,
        primerIntento: true
      }
    });

    // 3. Calculamos racha diaria 
    const { rachaActual, ultimaActividad } = calcularNuevaRacha(
      user.ultimaActividad,
      user.rachaActual
    );

    // 4. Actualizamos el usuario en la DB
    const userActualizado = await prisma.user.update({
      where: { id: userIdInt },
      data: { 
        rachaActual, 
        ultimaActividad 
      }
    });

    return res.status(200).json({
      success: true,
      message: "Progreso registrado con éxito en la base de datos.",
      puntosGanados,
      rachaActual: userActualizado.rachaActual,
      progreso: nuevoRegistro
    });

  } catch (error) {
    console.error("Error en saveProgress:", error);
    return res.status(500).json({ error: "Error interno al procesar el progreso del MVP." });
  }
};
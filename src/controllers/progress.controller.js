import { PrismaClient } from "@prisma/client";
import { calcularNuevaRacha } from "../utils/racha.utils.js";
import { verifyToken } from "../utils/jws.js"; 

const prisma = new PrismaClient();

// GET /progress - Obtener el historial de progreso real del usuario
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
    console.error(e);
    res
      .status(500)
      .json({ error: "No se pudo obtener el progreso del usuario" });
  }
};

// POST /progress/save-resolved - Registrar el progreso real y actualizar racha (soporta Ejercicios y Teorías)
export const saveProgress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token no provisto o inválido." });
    }
    const userId = verifyToken(token);
    const userIdInt = parseInt(userId);

    const { moduloId, lessonId, exerciseId, isCorrect, isTheory } = req.body;

    if (!lessonId || !exerciseId) {
      return res.status(400).json({ error: "Faltan parámetros requeridos (lessonId, exerciseId)." });
    }

    // Definición de puntos y errores:
    // Si es teoría, no suma puntos ni cuenta como error. Si es ejercicio, 10 si acierta, 2 si falla.
    let puntosGanados = 0;
    let cantidadErrores = 0;

    if (!isTheory) {
      puntosGanados = isCorrect ? 10 : 2;
      cantidadErrores = isCorrect ? 0 : 1;
    }

    // 1. Buscamos al usuario en la DB real para conocer su estado
    const user = await prisma.user.findUnique({
      where: { id: userIdInt }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // 2. Guardamos el intento en la tabla progreso
    const nuevoRegistro = await prisma.progreso.create({
      data: {
        userId: userIdInt,
        moduloId: parseInt(moduloId) || 1, // Default al módulo 1 si no se envía
        leccionId: parseInt(lessonId),
        ejercicioId: parseInt(exerciseId),
        puntos: puntosGanados,
        errores: cantidadErrores,
        primerIntento: true
      }
    });

    // 3. Calculamos la nueva racha y última actividad del usuario
    const { rachaActual, ultimaActividad } = calcularNuevaRacha(
      user.ultimaActividad,
      user.rachaActual
    );

    // 4. Actualizamos el perfil del usuario con su nuevo puntaje/racha
    const userActualizado = await prisma.user.update({
      where: { id: userIdInt },
      data: { 
        rachaActual, 
        ultimaActividad 
      }
    });

    return res.status(200).json({
      success: true,
      message: isTheory 
        ? "Visualización de teoría registrada con éxito." 
        : "Progreso del ejercicio registrado con éxito en la base de datos.",
      puntosGanados,
      rachaActual: userActualizado.rachaActual,
      progreso: nuevoRegistro
    });

  } catch (error) {
    console.error("Error en saveProgress:", error);
    return res.status(500).json({ error: "Error interno al procesar el progreso." });
  }
};
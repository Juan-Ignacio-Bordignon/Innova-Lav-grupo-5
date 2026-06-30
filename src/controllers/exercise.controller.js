import { PrismaClient } from "@prisma/client";
import { recuperarEstadoDeEjercicio } from "../services/exercise.service.js";

const prisma = new PrismaClient();

// GET /module/:moduleId/lessons/:lessonId/exercises
export const getExercises = async (req, res) => {
  try {
    const { moduleId, lessonId } = req.params;
    const LessonExercises = await prisma.ejercicio.findMany({
      where: {
        lessonId: parseInt(lessonId),
      },
    });

    if (!LessonExercises)
      return res.status(404).json({
        error: "No se pudo obtener los ejercicios de la lección especificada",
      });

    const authorization = req.headers.authorization;
    let exercises = await recuperarEstadoDeEjercicio(
      authorization,
      LessonExercises,
    );

    res.status(200).json({ exercises });
  } catch (e) {
    res.status(500).json({
      error: "No se pudo obtener los ejercicios de la lección especificada",
    });
  }
};

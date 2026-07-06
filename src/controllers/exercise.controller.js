import { PrismaClient } from "@prisma/client";
import { recuperarEstadoDeEjercicio } from "../services/exercise.service.js";

const prisma = new PrismaClient();

// GET /module/:moduleId/lessons/:lessonId/exercises
export const getExercises = async (req, res) => {
  try {
    const { moduleId, lessonId } = req.params;
    const LessonExercises = await getExercisesBylessonId(lessonId);
    
    //  Validación  para lecciones sin ejercicios cargados
    if (!LessonExercises || LessonExercises.length === 0) {
      return res.status(200).json({
        exercises: [],
        _meta: {
          status: "inDevelopment",
          message: "Esta lección se encuentra en desarrollo. Próximamente se añadirán ejercicios multimedia de LSA."
        }
      });
    }

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

function getExercisesBylessonId(lessonId) {
  return prisma.ejercicio.findMany({
    where: {
      lessonId: parseInt(lessonId),
    },
  });
}
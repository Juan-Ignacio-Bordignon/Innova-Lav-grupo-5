import { PrismaClient } from "@prisma/client";
import { recuperarEstadoDeEjercicio } from "../services/exercise.service.js";

const prisma = new PrismaClient();
const URL_BASE_VIDEOS = "https://ozrcernencngontkultp.supabase.co/storage/v1/object/public/videos-lsa/";
// URL Base para Supabase Storage (Bucket público: videos-lsa)

// GET /module/:moduleId/lessons/:lessonId/exercises
export const getExercises = async (req, res) => {
  try {
    const { moduleId, lessonId } = req.params;
    const LessonExercises = await getExercisesBylessonId(lessonId);
    
    // ⚠️ Control original del proyecto (Evita mapear si no hay ejercicios)
    if (!LessonExercises || LessonExercises.length === 0) {
      return res.status(404).json({
        error: "No se pudo obtener los ejercicios de la lección especificada",
      });
    }

    // Inyección de URL de Supabase: Convertimos los strings planos en URLs reales (.mp4)
    const exercisesConUrlReal = LessonExercises.map(exercise => {
      return {
        ...exercise,
        contenidoMultimedia: `${URL_BASE_VIDEOS}${exercise.contenidoMultimedia}.mp4`
      };
    });

    const authorization = req.headers.authorization;
    let exercises = await recuperarEstadoDeEjercicio(
      authorization,
      exercisesConUrlReal
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
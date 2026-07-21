import { PrismaClient } from "@prisma/client";
import { recuperarEstadoDeEjercicio } from "../services/exercise.service.js";
import { formatMediaUrls } from "../utils/formatters.js";

const prisma = new PrismaClient();
const URL_BASE_VIDEOS =
  "https://ozrcernencngontkultp.supabase.co/storage/v1/object/public/videos-lsa/";
// URL Base para Supabase Storage (Bucket público: videos-lsa)

// GET /module/:moduleId/lessons/:lessonId/exercises
export const getExercises = async (req, res) => {
  try {
    const { moduleId, lessonId } = req.params;
    const { lessonTheory, lessonExercises } =
      await getTheoryAndExercisesBylessonId(lessonId);

    //  Validación  para lecciones sin teoria
    if (!lessonTheory || lessonTheory.length === 0) {
      return res.status(200).json({
        exercises: [],
        _meta: {
          status: "inDevelopment",
          message:
            "Esta lección se encuentra en desarrollo. Próximamente se añadirán ejercicios multimedia de LSA.",
        },
      });
    }

    //  Validación  para lecciones sin ejercicios cargados
    if (!lessonExercises || lessonExercises.length === 0) {
      return res.status(200).json({
        exercises: [],
        _meta: {
          status: "inDevelopment",
          message:
            "Esta lección se encuentra en desarrollo. Próximamente se añadirán ejercicios multimedia de LSA.",
        },
      });
    }

    // Inyección de URL de Supabase: Convertimos los strings planos en URLs reales (.mp4)
    const theoryConUrlReal = formatMediaUrls(lessonTheory);

    // Inyección de URL de Supabase: Convertimos los strings planos en URLs reales (.mp4)
    const exercisesConUrlReal = formatMediaUrls(lessonExercises);
    const authorization = req.headers.authorization;
    /*
    let exercisesConEstado = await recuperarEstadoDeEjercicio(
      authorization,
      theoryConUrlReal,
    );
    */
    const intervaloPreguntas = obtenerIntervaloPreguntas(lessonId);
    const theoryAndExercise = combinarContenido(
      theoryConUrlReal,
      exercisesConUrlReal,
      intervaloPreguntas,
    );
    res.status(200).json(theoryAndExercise);
  } catch (e) {
    res.status(500).json({
      error: "No se pudo obtener los ejercicios de la lección especificada",
    });
  }
};

async function getTheoryAndExercisesBylessonId(lessonId) {
  const lessonTheory = await prisma.teoria.findMany({
    where: {
      lessonId: parseInt(lessonId),
    },
  });
  const lessonExercises = await prisma.ejercicio.findMany({
    where: {
      lessonId: parseInt(lessonId),
    },
  });
  return { lessonTheory, lessonExercises };
}

function combinarContenido(teoria, preguntas, intervaloPreguntas) {
  const resultado = [];
  let indicePregunta = 0;

  for (let i = 0; i < teoria.length; i++) {
    // Agregar la teoría
    resultado.push(teoria[i]);

    // Cada "intervaloPreguntas" agrega una pregunta
    if (
      (i + 1) % intervaloPreguntas === 0 &&
      indicePregunta < preguntas.length
    ) {
      resultado.push(preguntas[indicePregunta]);
      indicePregunta++;
    }
  }

  // Agrega las preguntas restantes
  while (indicePregunta < preguntas.length) {
    resultado.push(preguntas[indicePregunta]);
    indicePregunta++;
  }
  return resultado;
}

function obtenerIntervaloPreguntas(lessonId) {
  // Convertimos a número para evitar problemas si viene como String ("2")
  const id = Number(lessonId);

  switch (id) {
    case 1: // Alfabeto
      return 3;

    case 2: // Días
    case 3: // Números
    case 4: // Sentimientos
    case 5: // Saludos
    case 6: // Presentaciones
    case 7: // Frases de Entorno
    case 8: // Conectores de Emergencia
      return 4;

    default:
      return 3; // Intervalo por defecto si no coincide
  }
}

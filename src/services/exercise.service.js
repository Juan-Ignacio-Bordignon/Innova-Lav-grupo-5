import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/jws.js";

const prisma = new PrismaClient();
export async function recuperarEstadoDeEjercicio(
  authorization,
  lessonExercises,
) {
  let exercises = [];
  // Si no hay usuario autenticado
  if (!authorization) {
    return lessonExercises.map((ejercicio) => ({
      id: ejercicio.id,
      titulo: ejercicio.titulo,
      status: "notStarted",
      contenidoMultimedia: ejercicio.contenidoMultimedia,
    }));
  }

  // Obtener id del usuario
  const token = authorization.split(" ")[1];
  const userId = verifyToken(token);

  // Obtener los ids de los ejercicios de la lección
  const exerciseIds = lessonExercises.map((e) => e.id);

  // Buscar el progreso del usuario para esos ejercicios
  const progresos = await prisma.progreso.findMany({
    where: {
      userId: Number(userId),
      ejercicioId: {
        in: exerciseIds,
      },
    },
    select: {
      ejercicioId: true,
      primerIntento: true,
      completadoEn: true,
    },
  });
  // Armar la respuesta
  return lessonExercises.map((ejercicio) => {
    const progreso = progresos.find((p) => p.ejercicioId === ejercicio.id);

    let status = "notStarted";

    if (progreso) {
      if (progreso.completadoEn) {
        status = "completed";
      } else if (progreso.primerIntento) {
        status = "inProgress";
      }
    }

    return {
      id: ejercicio.id,
      titulo: ejercicio.titulo,
      status,
      contenidoMultimedia: ejercicio.contenidoMultimedia,
    };
  });
}

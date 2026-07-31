import { prisma } from "../prisma/prisma.js";
import { verifyToken } from "../utils/jws.js";

export async function recuperarEstadoDeEjercicio(
  authorization,
  lessonExercises,
) {
  // Si no hay usuario autenticado
  if (!authorization) {
    return lessonExercises.map((ejercicio) => ({
      ...ejercicio,
      status: "notStarted",
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
  // Arma la respuesta
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
      ...ejercicio,
      status,
    };
  });
}

export async function recuperarEstadoDeTeoria(authorization, lessonTeorias) {
  // Si no hay usuario autenticado
  if (!authorization) {
    return lessonTeorias.map((teoria) => ({
      ...teoria,
      status: "notStarted",
    }));
  }

  // Obtener id del usuario
  const token = authorization.split(" ")[1];
  const userId = verifyToken(token);

  // Obtener los ids de las teorias de la lección
  const teoriaIds = lessonTeorias.map((t) => t.id);

  // Buscar el progreso filtrando por teoriaId
  const progresos = await prisma.progreso.findMany({
    where: {
      userId: Number(userId),
      teoriaId: {
        in: teoriaIds,
      },
    },
    select: {
      teoriaId: true,
      primerIntento: true,
      completadoEn: true,
    },
  });
  // Arma la respuesta
  return lessonTeorias.map((teoria) => {
    const progreso = progresos.find((p) => p.teoriaId === teoria.id);

    let status = "notStarted";

    if (progreso) {
      if (progreso.completadoEn) {
        status = "completed";
      } else if (progreso.primerIntento) {
        status = "inProgress";
      }
    }

    return {
      ...teoria,
      status,
    };
  });
}

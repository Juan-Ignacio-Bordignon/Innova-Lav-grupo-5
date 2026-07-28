import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUserInfo = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      // Los campos que queremos devolver del usuario
      nombre: true,
      email: true,
      interes: true,
      puntos: true,
      rachaActual: true,
      // El progreso del usuario, incluyendo la lección y el módulo correspondiente
      progreso: {
        where: {
          completadoEn: {
            not: null,
          },
        },
        select: {
          leccionId: true,
          completadoEn: true,
          leccion: {
            select: {
              id: true,
              titulo: true,
            },
          },
          modulo: {
            select: {
              id: true,
              nombre: true,
            },
          },
          ejercicio: {
            select: {
              id: true,
              titulo: true,
            },
          },
          teoria: {
            select: {
              id: true,
              titulo: true,
            },
          },
        },
      },
      // Los logros del usuario, incluyendo la fecha en que se obtuvieron y la información del logro
      logros: {
        select: {
          fechaObtenido: true,
          logro: {
            select: {
              id: true,
              nombre: true,
              descripcion: true,
              icono: true,
            },
          },
        },
      },
    },
  });
  return user;
};

export async function getLastExercise(userId) {
  const progreso = await prisma.progreso.findMany({
    where: { id: userId },
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
      completadoEn: true,
    },
  });
  if (progreso.length === 0) {
    // Si no hay progreso, devolvemos null
    return null;
  } else if (progreso.length === 1) {
    // si hay uno solo, devolvemos ese
    return progreso[0];
  } else {
    // Si hay más de uno, devolvemos el último, que seria el más reciente
    return progreso[progreso.length - 1];
  }
}

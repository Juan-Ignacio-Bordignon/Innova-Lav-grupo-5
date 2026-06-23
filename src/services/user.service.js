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
              modulo: {
                select: {
                  id: true,
                  nombre: true,
                },
              },
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

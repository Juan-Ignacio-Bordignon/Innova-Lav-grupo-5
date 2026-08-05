import { prisma } from "../prisma/prisma.js";

export const checkAndUnlockAchievements = async (userId) => {
  const logros = await prisma.logro.findMany();

  const ejerciciosPorLeccion = await prisma.ejercicio.groupBy({
    by: ["lessonId"],
    _count: { id: true },
  });

  const totalEjerciciosPorLeccion = {};
  for (const item of ejerciciosPorLeccion) {
    totalEjerciciosPorLeccion[item.lessonId] = item._count.id;
  }

  const progresoUsuario = await prisma.progreso.findMany({
    where: {
      userId,
      ejercicioId: { not: null },
      completadoEn: { not: null },
    },
    select: {
      leccionId: true,
      ejercicioId: true,
      errores: true,
    },
  });

  const ejerciciosCompletadosPorLeccion = {};
  for (const p of progresoUsuario) {
    if (!ejerciciosCompletadosPorLeccion[p.leccionId]) {
      ejerciciosCompletadosPorLeccion[p.leccionId] = new Set();
    }
    ejerciciosCompletadosPorLeccion[p.leccionId].add(p.ejercicioId);
  }

  const leccionesCompletadas = new Set();
  for (const [lessonId, completados] of Object.entries(
    ejerciciosCompletadosPorLeccion
  )) {
    const total = totalEjerciciosPorLeccion[Number(lessonId)];
    if (total && completados.size >= total) {
      leccionesCompletadas.add(Number(lessonId));
    }
  }

  const logrosDesbloqueados = await prisma.userLogro.findMany({
    where: { userId },
    select: { logroId: true },
  });
  const logrosYaObtenidos = new Set(
    logrosDesbloqueados.map((l) => l.logroId)
  );

  const logrosParaDesbloquear = [];

  for (const logro of logros) {
    if (logrosYaObtenidos.has(logro.id)) continue;

    let debeDesbloquearse = false;

    if (logro.leccionId !== null) {
      if (leccionesCompletadas.has(logro.leccionId)) {
        debeDesbloquearse = true;
      }
    } else {
      if (logro.nombre === "Sin errores") {
        const leccionSinErrores = Object.entries(
          ejerciciosCompletadosPorLeccion
        ).some(([lessonId, ejercicios]) => {
          const total = totalEjerciciosPorLeccion[Number(lessonId)];
          if (!total || ejercicios.size < total) return false;
          const progresoDeLeccion = progresoUsuario.filter(
            (p) => p.leccionId === Number(lessonId)
          );
          return progresoDeLeccion.every((p) => p.errores === 0);
        });
        debeDesbloquearse = leccionSinErrores;
      }

      if (logro.nombre === "Aprendizaje completo") {
        const totalLecciones = Object.keys(totalEjerciciosPorLeccion).length;
        debeDesbloquearse =
          leccionesCompletadas.size >= totalLecciones;
      }
    }

    if (debeDesbloquearse) {
      logrosParaDesbloquear.push(logro.id);
    }
  }

  for (const logroId of logrosParaDesbloquear) {
    await prisma.userLogro.upsert({
      where: {
        userId_logroId: {
          userId,
          logroId,
        },
      },
      update: {},
      create: {
        userId,
        logroId,
      },
    });
  }

  return logrosParaDesbloquear.length;
};
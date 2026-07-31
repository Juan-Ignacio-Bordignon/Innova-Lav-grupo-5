import { calcularNuevaRacha } from "../utils/racha.utils.js";
import { prisma } from "../prisma/prisma.js";

export const saveProgress = async (req, res) => {
  try {
    const rawUserId = req.user?.userId || req.user?.id;
    if (!rawUserId) {
      return res
        .status(401)
        .json({ error: "Usuario no autenticado correctamente." });
    }

    const userId = Number(rawUserId);
    const {
      moduloId,
      lessonId,
      leccionId,
      teoriaId,
      ejercicioId,
      respuestaUsuario,
      isTheory,
    } = req.body;

    const targetLessonId = Number(lessonId || leccionId);
    const targetModuloId = Number(moduloId);

    if (!targetModuloId || !targetLessonId) {
      return res.status(400).json({
        error:
          "Faltan los identificadores obligatorios (moduloId y lessonId/leccionId).",
      });
    }

    // 1. FLUJO DE TEORÍA
    if (isTheory) {
      if (!teoriaId) {
        return res.status(400).json({
          error: "Falta el teoriaId para registrar el progreso de teoría.",
        });
      }

      const targetTeoriaId = Number(teoriaId);

      const progresoExistente = await prisma.progreso.findFirst({
        where: { userId, teoriaId: targetTeoriaId },
      });

      let progresoTeoria;
      if (progresoExistente) {
        progresoTeoria = await prisma.progreso.update({
          where: { id: progresoExistente.id },
          data: {
            completadoEn: new Date(),
          },
        });
      } else {
        progresoTeoria = await prisma.progreso.create({
          data: {
            userId,
            moduloId: targetModuloId,
            leccionId: targetLessonId,
            teoriaId: targetTeoriaId,
            completadoEn: new Date(),
          },
        });
      }

      return res.status(200).json({
        message: "Progreso de teoría guardado correctamente.",
        data: progresoTeoria,
      });
    }

    // 2. FLUJO DE EJERCICIO
    if (!ejercicioId || respuestaUsuario === undefined) {
      return res.status(400).json({
        error: "Faltan datos obligatorios para validar el ejercicio.",
      });
    }

    const targetEjercicioId = Number(ejercicioId);

    const ejercicio = await prisma.ejercicio.findUnique({
      where: { id: targetEjercicioId },
    });

    if (!ejercicio) {
      return res.status(404).json({ error: "Ejercicio no encontrado." });
    }

    // Buscamos si el usuario ya tenía un progreso guardado en este ejercicio
    const progresoExistente = await prisma.progreso.findUnique({
      where: {
        userId_ejercicioId: {
          userId,
          ejercicioId: targetEjercicioId,
        },
      },
    });

    // Validamos respuesta
    const esCorrecto =
      String(ejercicio.respuestaCorrecta).trim().toLowerCase() ===
      String(respuestaUsuario).trim().toLowerCase();

    // LÓGICA DE PUNTAJES ACORDADA:
    // - Incorrecta: 0 puntos.
    // - Ya estaba completado antes: 0 puntos (evita farming de puntos).
    // - Correcta al 1er intento (sin errores previos): 10 puntos.
    // - Correcta en reintento (con errores previos): 5 puntos.
    const yaEstabaCompletado = progresoExistente?.completado || false;
    const tuvoErroresPrevios = (progresoExistente?.errores || 0) > 0;

    let puntosASumar = 0;
    if (esCorrecto && !yaEstabaCompletado) {
      puntosASumar = tuvoErroresPrevios ? 5 : 10;
    }

    const errorRegistrado = esCorrecto ? 0 : 1;

    // Persistimos progreso de ejercicio
    const progresoEjercicio = await prisma.progreso.upsert({
      where: {
        userId_ejercicioId: {
          userId,
          ejercicioId: targetEjercicioId,
        },
      },
      update: {
        completado: esCorrecto || yaEstabaCompletado,
        errores: { increment: errorRegistrado },
        puntos: { increment: puntosASumar },
        updatedAt: new Date(),
      },
      create: {
        userId,
        moduloId: targetModuloId,
        leccionId: targetLessonId,
        ejercicioId: targetEjercicioId,
        completado: esCorrecto,
        errores: errorRegistrado,
        puntos: puntosASumar,
      },
    });

    // 3. ACTUALIZACIÓN DE USUARIO Y RACHA
    const usuarioActual = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!usuarioActual) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Mapeo seguro para calcular racha
    const rachaPrevio =
      usuarioActual.rachaActual ?? usuarioActual.rachaDias ?? 0;
    const resultadoRacha = calcularNuevaRacha(
      usuarioActual.ultimaActividad,
      rachaPrevio,
    );

    const updateUserData = {
      puntos: { increment: puntosASumar },
      rachaActual: resultadoRacha.rachaActual ?? 1,
      ultimaActividad: resultadoRacha.ultimaActividad ?? new Date(),
    };

    await prisma.user.update({
      where: { id: userId },
      data: updateUserData,
    });

    return res.status(200).json({
      message: "Progreso de ejercicio procesado correctamente.",
      esCorrecto,
      puntosGanados: puntosASumar,
      rachaActual: resultadoRacha.rachaActual ?? 1,
      data: progresoEjercicio,
    });
  } catch (error) {
    console.error("Error en saveProgress:", error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor al guardar el progreso." });
  }
};

// Obtener el progreso general del usuario
export const getProgress = async (req, res) => {
  try {
    const rawUserId = req.user?.userId || req.user?.id;
    if (!rawUserId) {
      return res.status(401).json({ error: "Usuario no autenticado." });
    }

    const userId = Number(rawUserId);

    const progreso = await prisma.progreso.findMany({
      where: { userId },
    });

    return res.status(200).json({
      message: "Progreso obtenido correctamente.",
      data: progreso || [],
    });
  } catch (error) {
    console.error("Error en getProgress:", error);
    return res
      .status(500)
      .json({ error: "Error al obtener el progreso del usuario." });
  }
};

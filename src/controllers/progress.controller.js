import { PrismaClient } from '@prisma/client';
import { calcularNuevaRacha } from '../utils/racha.utils.js';

const prisma = new PrismaClient();

export const saveProgress = async (req, res) => {
  try {
    const rawUserId = req.user?.userId || req.user?.id;
    if (!rawUserId) {
      return res.status(401).json({ error: "Usuario no autenticado correctamente." });
    }

    const userId = Number(rawUserId);
    const { moduloId, lessonId, leccionId, teoriaId, ejercicioId, respuestaUsuario, isTheory } = req.body;

    // Normalizamos el ID de la lección por si llega como lessonId o leccionId
    const targetLessonId = Number(lessonId || leccionId);
    const targetModuloId = Number(moduloId);

    if (!targetModuloId || !targetLessonId) {
      return res.status(400).json({ error: "Faltan los identificadores obligatorios (moduloId y lessonId/leccionId)." });
    }

    // 1. FLUJO DE TEORÍA
    if (isTheory) {
      if (!teoriaId) {
        return res.status(400).json({ error: "Falta el teoriaId para registrar el progreso de teoría." });
      }

      const targetTeoriaId = Number(teoriaId);

      const progresoTeoria = await prisma.progreso.upsert({
        where: {
          userId_teoriaId: { 
            userId, 
            teoriaId: targetTeoriaId 
          }
        },
        update: {
          completado: true,
          updatedAt: new Date()
        },
        create: {
          userId,
          moduloId: targetModuloId,
          leccionId: targetLessonId,
          teoriaId: targetTeoriaId,
          completado: true
        }
      });

      return res.status(200).json({
        message: "Progreso de teoría guardado correctamente.",
        data: progresoTeoria
      });
    }

    // 2. FLUJO DE EJERCICIO
    if (!ejercicioId || respuestaUsuario === undefined) {
      return res.status(400).json({ error: "Faltan datos obligatorios para validar el ejercicio." });
    }

    const targetEjercicioId = Number(ejercicioId);

    const ejercicio = await prisma.ejercicio.findUnique({
      where: { id: targetEjercicioId }
    });

    if (!ejercicio) {
      return res.status(404).json({ error: "Ejercicio no encontrado." });
    }

    // Buscamos si el usuario ya tenía un registro previo en este ejercicio
    const progresoExistente = await prisma.progreso.findUnique({
      where: {
        userId_ejercicioId: {
          userId,
          ejercicioId: targetEjercicioId
        }
      }
    });

    // Validamos la respuesta entregada por el usuario
    const esCorrecto = String(ejercicio.respuestaCorrecta).trim().toLowerCase() === String(respuestaUsuario).trim().toLowerCase();

    // Verificamos historial previo
    const yaEstabaCompletado = progresoExistente?.completado || false;
    const tuvoErroresPrevios = (progresoExistente?.errores || 0) > 0;

    // LÓGICA DE PUNTAJE ACORDADA :
    // - Incorrecta: 0 puntos.
    // - Ya estaba completado antes: 0 puntos (no suma).
    // - Correcta al 1er intento (sin errores previos): 10 puntos.
    // - Correcta en reintento (con errores previos): 5 puntos.
    let puntosASumar = 0;

    if (esCorrecto && !yaEstabaCompletado) {
      puntosASumar = tuvoErroresPrevios ? 5 : 10;
    }

    const errorRegistrado = esCorrecto ? 0 : 1;

    // Persistimos progreso del ejercicio
    const progresoEjercicio = await prisma.progreso.upsert({
      where: {
        userId_ejercicioId: { 
          userId, 
          ejercicioId: targetEjercicioId 
        }
      },
      update: {
        completado: esCorrecto || yaEstabaCompletado, // Mantiene completado si ya lo aprobó
        errores: { increment: errorRegistrado },
        puntos: { increment: puntosASumar },
        updatedAt: new Date()
      },
      create: {
        userId,
        moduloId: targetModuloId,
        leccionId: targetLessonId,
        ejercicioId: targetEjercicioId,
        completado: esCorrecto,
        errores: errorRegistrado,
        puntos: puntosASumar
      }
    });

    // 3. ACTUALIZACIÓN DE USUARIO Y RACHA
    const usuarioActual = await prisma.usuario.findUnique({
      where: { id: userId }
    });

    if (!usuarioActual) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const resultadoRacha = calcularNuevaRacha(usuarioActual.ultimaActividad, usuarioActual.rachaDias);

    await prisma.usuario.update({
      where: { id: userId },
      data: {
        puntosTotales: { increment: puntosASumar },
        rachaDias: resultadoRacha.rachaActual,
        ultimaActividad: resultadoRacha.ultimaActividad
      }
    });

    return res.status(200).json({
      message: "Progreso de ejercicio procesado correctamente.",
      esCorrecto,
      puntosGanados: puntosASumar,
      rachaActual: resultadoRacha.rachaActual,
      data: progresoEjercicio
    });

  } catch (error) {
    console.error("Error en saveProgress:", error);
    return res.status(500).json({ error: "Error interno del servidor al guardar el progreso." });
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
      where: { userId }
    });

    return res.status(200).json({
      message: "Progreso obtenido correctamente.",
      data: progreso || []
    });
  } catch (error) {
    console.error("Error en getProgress:", error);
    return res.status(500).json({ error: "Error al obtener el progreso del usuario." });
  }
};
import { PrismaClient } from '@prisma/client';
import { calcularNuevaRacha } from '../utils/racha.utils.js';

const prisma = new PrismaClient();

export const saveProgress = async (req, res) => {
  try {
    const { userId } = req.user; 
    const { moduloId, lessonId, teoriaId, ejercicioId, respuestaUsuario, isTheory } = req.body;

    // 1. FLUJO DE TEORÍA (Issue #71 - IDs separados)
    if (isTheory) {
      if (!teoriaId) {
        return res.status(400).json({ error: "Falta el teoriaId para registrar el progreso de teoría." });
      }

      const progresoTeoria = await prisma.progreso.upsert({
        where: {
          userId_teoriaId: { userId, teoriaId }
        },
        update: {
          completado: true,
          updatedAt: new Date()
        },
        create: {
          userId,
          moduloId,
          leccionId: lessonId,
          teoriaId,
          completado: true
        }
      });

      return res.status(200).json({
        message: "Progreso de teoría guardado correctamente.",
        data: progresoTeoria
      });
    }

    // 2. FLUJO DE EJERCICIO (Issue #71 - Validación en el Back y consolidación de endpoints)
    if (!ejercicioId || respuestaUsuario === undefined) {
      return res.status(400).json({ error: "Faltan datos obligatorios para validar el ejercicio." });
    }

    const ejercicio = await prisma.ejercicio.findUnique({
      where: { id: ejercicioId }
    });

    if (!ejercicio) {
      return res.status(404).json({ error: "Ejercicio no encontrado." });
    }

    // Validamos la respuesta contra la DB
    const esCorrecto = ejercicio.respuestaCorrecta.trim().toLowerCase() === respuestaUsuario.trim().toLowerCase();
    const puntosASumar = esCorrecto ? 10 : 2;
    const errorRegistrado = esCorrecto ? 0 : 1;

    // Persistimos en la tabla de progreso
    const progresoEjercicio = await prisma.progreso.upsert({
      where: {
        userId_ejercicioId: { userId, ejercicioId }
      },
      update: {
        completado: esCorrecto ? true : false,
        errores: { increment: errorRegistrado },
        puntos: { increment: puntosASumar },
        updatedAt: new Date()
      },
      create: {
        userId,
        moduloId,
        leccionId: lessonId,
        ejercicioId,
        completado: esCorrecto ? true : false,
        errores: errorRegistrado,
        puntos: puntosASumar
      }
    });

    // 3. LÓGICA DE PUNTOS Y RACHAS (Issue #99)
    const usuarioActual = await prisma.usuario.findUnique({
      where: { id: userId }
    });

    if (!usuarioActual) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Calculamos la nueva racha usando la fecha de la última actividad
    const resultadoRacha = calcularNuevaRacha(usuarioActual.ultimaActividad, usuarioActual.rachaDias);

    // Actualizamos el perfil global del usuario con sus nuevos totales
    await prisma.usuario.update({
      where: { id: userId },
      data: {
        puntosTotales: { increment: puntosASumar },
        rachaDias: resultadoRacha.rachaActual, // <-- Pasamos solo el número
        ultimaActividad: resultadoRacha.ultimaActividad
      }
    });

    return res.status(200).json({
      message: "Progreso de ejercicio procesado, puntos y racha actualizados.",
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
    const { userId } = req.user;

    const progreso = await prisma.progreso.findMany({
      where: { userId }
    });

    return res.status(200).json({
      message: "Progreso obtenido correctamente.",
      data: progreso
    });
  } catch (error) {
    console.error("Error en getProgress:", error);
    return res.status(500).json({ error: "Error al obtener el progreso del usuario." });
  }
};
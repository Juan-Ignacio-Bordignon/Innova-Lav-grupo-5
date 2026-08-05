import { calcularNuevaRacha } from "../utils/racha.utils.js";
import { prisma } from "../prisma/prisma.js";
import { checkAndUnlockAchievements } from "../services/gamification.service.js";

// Función auxiliar para normalizar respuestas (soporta JSON, cadenas, números y arreglos de la DB)
const normalizarRespuesta = (val) => {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val.trim().toLowerCase();
  if (typeof val === "number") return String(val).trim().toLowerCase();
  if (Array.isArray(val)) return val.map((v) => String(v).trim().toLowerCase()).join(",");
  if (typeof val === "object") {
    const textVal = val.text || val.value || val.respuesta || JSON.stringify(val);
    return String(textVal).trim().toLowerCase();
  }
  return String(val).trim().toLowerCase();
};

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

    // Aceptamos leccionId o lessonId desde el Front y lo mapeamos a targetLeccionId (columna en DB: leccionId)
    const targetLeccionId = Number(leccionId || lessonId);
    const targetModuloId = Number(moduloId);

    if (!targetModuloId || !targetLeccionId) {
      return res.status(400).json({
        error:
          "Faltan los identificadores obligatorios (moduloId y leccionId/lessonId).",
      });
    }

    // ==========================================
    // 1. FLUJO DE TEORÍA
    // ==========================================
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
            leccionId: targetLeccionId,
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

    // ==========================================
    // 2. FLUJO DE EJERCICIO
    // ==========================================
    if (!ejercicioId || respuestaUsuario === undefined) {
      return res.status(400).json({
        error: "Faltan datos obligatorios para validar el ejercicio.",
      });
    }

    const targetEjercicioId = Number(ejercicioId);

    const [ejercicio, progresoExistente, usuarioActual] = await Promise.all([
      prisma.ejercicio.findUnique({ where: { id: targetEjercicioId } }),
      prisma.progreso.findFirst({
        where: { userId, ejercicioId: targetEjercicioId },
      }),
      prisma.user.findUnique({ where: { id: userId } }),
    ]);

    if (!ejercicio) {
      return res.status(404).json({ error: "Ejercicio no encontrado." });
    }

    if (!usuarioActual) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Validamos respuesta usando respuestaEsperada (columna Json del schema.prisma)
    const strRespuestaBD = normalizarRespuesta(ejercicio.respuestaEsperada);
    const strRespuestaUser = normalizarRespuesta(respuestaUsuario);

    const esCorrecto = strRespuestaBD === strRespuestaUser;

    // LÓGICA DE PUNTAJES ACORDADA:
    // - Incorrecta: 0 puntos.
    // - Ya estaba completado antes (completadoEn != null): 0 puntos (evita farming de puntos).
    // - Correcta al 1er intento (sin errores previos): 10 puntos.
    // - Correcta en reintento (con errores previos): 5 puntos.
    const yaEstabaCompletado = Boolean(progresoExistente?.completadoEn);
    const tuvoErroresPrevios = (progresoExistente?.errores || 0) > 0;

    let puntosASumar = 0;
    if (esCorrecto && !yaEstabaCompletado) {
      puntosASumar = tuvoErroresPrevios ? 5 : 10;
    }

    const errorRegistrado = esCorrecto ? 0 : 1;

    // Persistimos progreso de ejercicio usando la ID individual si ya existe
    let progresoEjercicio;
    if (progresoExistente) {
      progresoEjercicio = await prisma.progreso.update({
        where: { id: progresoExistente.id },
        data: {
          completadoEn: esCorrecto ? (progresoExistente.completadoEn || new Date()) : progresoExistente.completadoEn,
          errores: { increment: errorRegistrado },
          puntos: { increment: puntosASumar },
        },
      });
    } else {
      progresoEjercicio = await prisma.progreso.create({
        data: {
          userId,
          moduloId: targetModuloId,
          leccionId: targetLeccionId,
          ejercicioId: targetEjercicioId,
          completadoEn: esCorrecto ? new Date() : null,
          errores: errorRegistrado,
          puntos: puntosASumar,
        },
      });
    }

    // ==========================================
    // 3. ACTUALIZACIÓN DE USUARIO Y RACHA
    // ==========================================
    const rachaPrevio = usuarioActual.rachaActual ?? 0;

    const resultadoRacha = calcularNuevaRacha(
      usuarioActual.ultimaActividad,
      rachaPrevio
    );

    const nuevaRachaValor =
      typeof resultadoRacha === "number"
        ? resultadoRacha
        : resultadoRacha?.rachaActual ?? 1;

    const fechaActividad =
      typeof resultadoRacha === "object" && resultadoRacha?.ultimaActividad
        ? resultadoRacha.ultimaActividad
        : new Date();

await prisma.user.update({
       where: { id: userId },
       data: {
         puntos: { increment: puntosASumar },
         ultimaActividad: fechaActividad,
         rachaActual: nuevaRachaValor,
       },
     });

     await checkAndUnlockAchievements(userId);

     return res.status(200).json({
      message: "Progreso de ejercicio procesado correctamente.",
      esCorrecto,
      puntosGanados: puntosASumar,
      rachaActual: nuevaRachaValor,
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
      include: {
        modulo: { select: { id: true, nombre: true } },
        leccion: { select: { id: true, titulo: true } },
        ejercicio: { select: { id: true, titulo: true } },
        teoria: { select: { id: true, titulo: true } },
      },
      orderBy: { completadoEn: "desc" },
    });

    const normalized = progreso.map((p) => ({
      id: p.id,
      moduloId: p.moduloId,
      leccionId: p.leccionId,
      ejercicioId: p.ejercicioId,
      teoriaId: p.teoriaId,
      completadoEn: p.completadoEn,
      errores: p.errores,
      puntos: p.puntos,
      modulo: p.modulo,
      leccion: p.leccion,
      ejercicio: p.ejercicio,
      teoria: p.teoria,
    }));

    return res.status(200).json({
      message: "Progreso obtenido correctamente.",
      data: normalized,
    });
  } catch (error) {
    console.error("Error en getProgress:", error);
    return res
      .status(500)
      .json({ error: "Error al obtener el progreso del usuario." });
  }
};
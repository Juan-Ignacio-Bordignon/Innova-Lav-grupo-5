import { PrismaClient } from "@prisma/client";
import { calcularNuevaRacha } from "../utils/racha.utils.js";
import { verifyToken } from "../utils/jws.js"; 

const prisma = new PrismaClient();

// GET /progress - Obtener el historial de progreso real del usuario
export const getProgress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token no provisto" });
    }
    const userId = verifyToken(token);

    const progreso = await prisma.progreso.findMany({
      where: { userId: parseInt(userId) },
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
        teoriaId: true, // Agregado para soportar el esquema dinámico
        errores: true,
        puntos: true,
        primerIntento: true,
        completadoEn: true,
      },
    });

    res.json({ progreso });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "No se pudo obtener el progreso del usuario" });
  }
};

// POST /progress/save-resolved - Registrar progreso real, validar respuestas y verificar logros
export const saveProgress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token no provisto o inválido." });
    }
    const userId = verifyToken(token);
    const userIdInt = parseInt(userId);

    // Extraemos los nuevos parámetros acordados (teoriaId, ejercicioId y la respuesta del usuario)
    const { moduloId, lessonId, teoriaId, ejercicioId, respuestaUsuario, isTheory } = req.body;

    if (!lessonId) {
      return res.status(400).json({ error: "Falta el parámetro requerido: lessonId." });
    }

    let puntosGanados = 0;
    let cantidadErrores = 0;

    // Lógica de validación dinámica según el tipo de pantalla
    if (isTheory) {
      if (!teoriaId) {
        return res.status(400).json({ error: "Falta el parámetro teoriaId para registrar el progreso teórico." });
      }
      // Las teorías no suman puntos ni errores
      puntosGanados = 0;
      cantidadErrores = 0;
    } else {
      if (!ejercicioId) {
        return res.status(400).json({ error: "Falta el parámetro ejercicioId para validar el ejercicio." });
      }

      // Buscamos el ejercicio en la DB para validar de forma segura en el Backend
      const ejercicioDB = await prisma.ejercicio.findUnique({
        where: { id: parseInt(ejercicioId) }
      });

      if (!ejercicioDB) {
        return res.status(404).json({ error: "El ejercicio especificado no existe en la base de datos." });
      }

      // Validamos si la respuesta del usuario coincide con la respuesta correcta almacenada
      // NOTA: Si en tu modelo de Prisma la columna se llama distinto (ej. 'respuesta'), cambialo acá
      const esCorrecto = (respuestaUsuario === ejercicioDB.respuestaCorrecta);

      puntosGanados = esCorrecto ? 10 : 2;
      cantidadErrores = esCorrecto ? 0 : 1;
    }

    // 1. Buscamos al usuario en la DB real para conocer su estado de racha
    const user = await prisma.user.findUnique({
      where: { id: userIdInt }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // 2. Guardamos el registro en la tabla progreso mapeando los IDs correspondientes
    const nuevoRegistro = await prisma.progreso.create({
      data: {
        userId: userIdInt,
        moduloId: parseInt(moduloId) || 1, 
        leccionId: parseInt(lessonId),
        ejercicioId: isTheory ? null : parseInt(ejercicioId),
        teoriaId: isTheory ? parseInt(teoriaId) : null,
        puntos: puntosGanados,
        errores: cantidadErrores,
        primerIntento: true
      }
    });

    // 3. Calculamos la nueva racha y última actividad del usuario
    const { rachaActual, ultimaActividad } = calcularNuevaRacha(
      user.ultimaActividad,
      user.rachaActual
    );

    // 4. Actualizamos el perfil del usuario con su racha al día
    const userActualizado = await prisma.user.update({
      where: { id: userIdInt },
      data: { 
        rachaActual, 
        ultimaActividad 
      }
    });

    // 5. Lógica de Logros (Propuesta unificada con Bordi)
    let logroDesbloqueado = null;

    if (!isTheory) {
      // Verificamos si este ejercicio era el último de la lección actual
      const hayMasEjercicios = await prisma.ejercicio.findFirst({
        where: {
          leccionId: parseInt(lessonId),
          id: { gt: parseInt(ejercicioId) } // Busca si hay algún ID de ejercicio mayor en esta lección
        }
      });

      // Si no quedan más ejercicios en la lección y este último fue correcto, completó la lección
      if (!hayMasEjercicios && puntosGanados === 10) {
        
        // Verificamos si en todo su historial de esta lección cometió algún error
        const cometioErrores = await prisma.progreso.findFirst({
          where: {
            userId: userIdInt,
            leccionId: parseInt(lessonId),
            errores: { gt: 0 }
          }
        });

        if (!cometioErrores) {
          // Condición cumplida para el logro especial "Sin Errores"
          logroDesbloqueado = {
            tipo: "SIN_ERRORES",
            mensaje: "¡Increíble! Completaste la lección entera de forma invicta."
          };
          // NOTA: Cuando Juan termine la tabla de logros, acá se llamará a:
          // await prisma.logroUsuario.create({ data: { ... } })
        } else {
          // Logro estándar por finalizar la lección con reintentos
          logroDesbloqueado = {
            tipo: "LECCION_COMPLETADA",
            mensaje: "¡Felicitaciones! Completaste todos los ejercicios de la lección."
          };
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: isTheory 
        ? "Visualización de teoría registrada con éxito." 
        : "Progreso del ejercicio validado e impactado con éxito.",
      puntosGanados,
      rachaActual: userActualizado.rachaActual,
      logroDesbloqueado, // El front recibe de antemano si saltó una insignia
      progreso: nuevoRegistro
    });

  } catch (error) {
    console.error("Error en saveProgress:", error);
    return res.status(500).json({ error: "Error interno al procesar el progreso." });
  }
};
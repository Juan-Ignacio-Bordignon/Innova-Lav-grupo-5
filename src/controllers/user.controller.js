import { getUserInfo, getLastExercise } from "../services/user.service.js";
import { verifyToken } from "../utils/jws.js";

export const getUser = async (req, res) => {
  try {
    // Extraer el token de autorización del encabezado de la solicitud
    const token = req.headers.authorization.split(" ")[1];
    const userId = verifyToken(token);

    // Obtener la información del usuario desde la base de datos
    const user = await getUserInfo(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const lastExercise = await getLastExercise(userId);
    let ultimaLeccion = {};
    if (lastExercise) {
      ultimaLeccion = {
        moduleId: lastExercise.moduloId,
        moduleName: lastExercise.modulo.nombre,
        lessonId: lastExercise.leccionId,
        lessonName: lastExercise.leccion.titulo,
        exerciseId: lastExercise.ejercicioId,
        exerciseName: lastExercise.ejercicio.titulo,
        completadoEn: lastExercise.completadoEn,
      };
    } else {
      ultimaLeccion = null;
    }
    res.json({
      usuario: {
        username: user.nombre,
        email: user.email,
        interes: user.interes,
      },
      progreso: user.progreso.map((progreso) => {
        const esEjercicio = Boolean(progreso.ejercicio);
        return {
          tipo: esEjercicio ? "ejercicio" : "teoria",
          moduleId: progreso.modulo.id,
          moduleName: progreso.modulo.nombre,
          lessonId: progreso.leccionId,
          lessonName: progreso.leccion.titulo,
          exerciseId: progreso.ejercicio?.id ?? null,
          exerciseName: progreso.ejercicio?.titulo ?? null,
          teoriaId: progreso.teoria?.id ?? null,
          teoriaName: progreso.teoria?.titulo ?? null,
          completadoEn: progreso.completadoEn,
        };
      }),
      ultimaLeccion: ultimaLeccion,
      puntos: user.puntos,
      racha: user.rachaActual,
      logros: user.logros.map((logro) => ({
        id: logro.logro.id,
        nombre: logro.logro.nombre,
        descripcion: logro.logro.descripcion,
        icono: logro.logro.icono,
      })),
    });
  } catch (error) {
    console.error("Error al obtener la información del usuario", error);
    res
      .status(500)
      .json({ error: "No se pudo obtener la información del usuario" });
  }
};

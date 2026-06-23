import { getUserInfo } from "../services/user.service.js";

export const getUser = async (req, res) => {
  try {
    // Extraer el token de autorización del encabezado de la solicitud
    const token = req.headers.authorization?.split(" ")[1];
    const userId = verifyToken(token);

    // Obtener la información del usuario desde la base de datos
    const user = await getUserInfo(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
      usuario: {
        username: user.nombre,
        email: user.email,
        interes: user.interes,
      },
      progreso: user.progreso.map((progreso) => ({
        LessonId: progreso.leccionId,
        LessonName: progreso.leccion.titulo,
        ModuleId: progreso.leccion.modulo.id,
        ModuleName: progreso.leccion.modulo.nombre,
        completadoEn: progreso.completadoEn,
      })),
      // Hay que modificar esto para que traiga la última lección completada del usuario, actualmente está hardcodeado
      ultimaLeccion: {
        ModuleId: 1,
        LessonId: [3],
      },
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

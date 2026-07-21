import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET /module/:moduleId/lessons
export const getLessons = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const lecciones = await prisma.leccion.findMany({
      where: { moduloId: parseInt(moduleId) },
      select: {
        id: true,
        titulo: true,
        contenido: true,
        moduloId: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    res.json({ lessons: lecciones });
  } catch (e) {
    res.status(500).json({
      error: "No se pudieron obtener las lecciones para el módulo especificado",
    });
  }
};

// GET /module/:moduleId/lessons/:lessonId
export const getLesson = async (req, res) => {
  try {
    const { moduleId, lessonId } = req.params;
    const leccion = await prisma.leccion.findFirst({
      where: {
        id: parseInt(lessonId),
        moduloId: parseInt(moduleId),
      },
      orderBy: {
        id: "asc",
      },
    });
    if (!leccion)
      return res
        .status(404)
        .json({ error: "No se pudo obtener la lección especificada" });
    res.json({ lesson: leccion });
  } catch (e) {
    res
      .status(500)
      .json({ error: "No se pudo obtener la lección especificada" });
  }
};

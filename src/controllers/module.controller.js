import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET /module
export const getModules = async (req, res) => {
  try {
    const modulos = await prisma.modulo.findMany({
      include: { lecciones: true }
    });
    res.json({ modules: modulos });
  } catch (e) {
    res.status(500).json({ error: "No se pudieron obtener los módulos" });
  }
};

// GET /module/:moduleId/lessons
export const getLessons = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const lecciones = await prisma.leccion.findMany({
      where: { moduloId: parseInt(moduleId) }
    });
    res.json({ lessons: lecciones });
  } catch (e) {
    res.status(500).json({ error: "No se pudieron obtener las lecciones para el módulo especificado" });
  }
};

// GET /module/:moduleId/lessons/:lessonId
export const getLesson = async (req, res) => {
  try {
    const { moduleId, lessonId } = req.params;
    const leccion = await prisma.leccion.findFirst({
      where: {
        id: parseInt(lessonId),
        moduloId: parseInt(moduleId)
      }
    });
    if (!leccion) return res.status(404).json({ error: "No se pudo obtener la lección especificada" });
    res.json({ lesson: leccion });
  } catch (e) {
    res.status(500).json({ error: "No se pudo obtener la lección especificada" });
  }
};
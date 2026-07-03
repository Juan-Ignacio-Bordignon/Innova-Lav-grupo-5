import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET /module
export const getModules = async (req, res) => {
  try {
    const modulos = await prisma.modulo.findMany({
      include: { lecciones: true },
    });
    res.json({ modules: modulos });
  } catch (e) {
    res.status(500).json({ error: "No se pudieron obtener los módulos" });
  }
};

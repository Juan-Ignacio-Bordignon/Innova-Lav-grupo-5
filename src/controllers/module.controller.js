import { prisma } from "../prisma/prisma.js";

// GET /module
export const getModules = async (req, res) => {
  try {
    const modulos = await prisma.modulo.findMany({
      include: { lecciones: true },
      orderBy: {
        id: "asc",
      },
    });

    res.json({ modules: modulos });
  } catch (e) {
    res.status(500).json({ error: "No se pudieron obtener los módulos" });
  }
};

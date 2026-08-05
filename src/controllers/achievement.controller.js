import { prisma } from "../prisma/prisma.js";
import { verifyToken } from "../utils/jws.js";

export const getAchievements = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = verifyToken(token);

    const userLogros = await prisma.userLogro.findMany({
      where: { userId },
      include: {
        logro: {
          select: {
            id: true,
            nombre: true,
            descripcion: true,
            icono: true,
          },
        },
      },
      orderBy: {
        fechaObtenido: "desc",
      },
    });

    const logros = userLogros.map((ul) => ({
      id: ul.logro.id,
      nombre: ul.logro.nombre,
      descripcion: ul.logro.descripcion,
      icono: ul.logro.icono,
      obtenidoEn: ul.fechaObtenido,
    }));

    res.json({ logros });
  } catch (error) {
    console.error("Error al obtener los logros:", error);
    res
      .status(500)
      .json({ error: "No se pudieron obtener los logros del usuario." });
  }
};
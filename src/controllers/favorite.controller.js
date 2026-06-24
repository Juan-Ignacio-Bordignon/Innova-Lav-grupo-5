import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/jws.js";

const prisma = new PrismaClient();

// POST /favorites → agregar favorito
export const addFavorite = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = verifyToken(token);

    const { leccionId } = req.body;
    const favorite = await prisma.favorite.create({
      data: {
        userId: parseInt(userId),
        leccionId: parseInt(leccionId),
      },
    });
    res.json({ mensaje: "Lección agregada a favoritos", favorite });
  } catch (e) {
    if (e.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Esta lección ya está en favoritos" });
    }
    res.status(500).json({ error: "No se pudo agregar a favoritos" });
  }
};

// GET /favorites → traer favoritos del usuario
export const getFavorites = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = verifyToken(token);

    const favoritos = await prisma.favorite.findMany({
      where: { userId: parseInt(userId) },
      include: { leccion: true },
    });
    res.json({ favorites: favoritos });
  } catch (e) {
    res.status(500).json({ error: "No se pudieron obtener los favoritos" });
  }
};

// DELETE /favorites/:id → quitar favorito
export const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.favorite.delete({
      where: { id: parseInt(id) },
    });
    res.json({ mensaje: "Lección eliminada de favoritos" });
  } catch (e) {
    res.status(500).json({ error: "No se pudo eliminar de favoritos" });
  }
};

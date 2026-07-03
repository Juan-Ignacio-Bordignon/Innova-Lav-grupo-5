import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/jws.js";

const prisma = new PrismaClient();

// POST /favorites → agregar favorito
export const addFavorite = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = verifyToken(token);

    const { exerciseId } = req.body;
    const favorite = await prisma.favorite.create({
      data: {
        userId: parseInt(userId),
        ejercicioId: parseInt(exerciseId),
      },
    });
    res.json({ mensaje: "Ejercicio agregado a favoritos", favorite });
  } catch (e) {
    if (e.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Este ejercicio ya está en favoritos" });
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
      include: { ejercicio: true },
    });
    res.json({ favorites: favoritos });
  } catch (e) {
    res.status(500).json({ error: "No se pudieron obtener los favoritos" });
  }
};

// DELETE /favorites/:exerciseId → quitar favorito
export const deleteFavorite = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = verifyToken(token);
    const { exerciseId } = req.params;

    await prisma.favorite.delete({
      where: {
        userId_ejercicioId: {
          userId: parseInt(userId),
          ejercicioId: parseInt(exerciseId),
        },
      },
    });
    res.json({ mensaje: "Ejercicio eliminado de favoritos" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "No se pudo eliminar de favoritos" });
  }
};

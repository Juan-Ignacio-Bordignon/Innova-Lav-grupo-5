import { Router } from "express";
import {
  addFavorite,
  getFavorites,
  deleteFavorite
} from "../controllers/favorite.controller.js";

const router = Router();

router.post("/", addFavorite);
router.get("/:userId", getFavorites);
router.delete("/:id", deleteFavorite);

export default router;
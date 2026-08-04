import { Router } from "express";
import {
  addFavorite,
  getFavorites,
  deleteFavorite,
} from "../controllers/favorite.controller.js";

const router = Router();

router.post("/", addFavorite);
router.get("/", getFavorites);
router.delete("/:teoriaId", deleteFavorite);

export default router;

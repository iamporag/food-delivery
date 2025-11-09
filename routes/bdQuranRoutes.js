import express from "express";
import { getAllSurahs, getSurahById } from "../controllers/bdQuranController.js";

const router = express.Router();

router.get("/", getAllSurahs);
router.get("/:id", getSurahById);

export default router;

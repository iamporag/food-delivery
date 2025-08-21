import {Router} from"express";
import { getFoods, createFood } from"../controllers/foodController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getFoods);
router.post("/", protect, admin, createFood); 

export default router;

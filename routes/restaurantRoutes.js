import { Router } from "express";
import {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
} from "../controllers/restaurantController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
const router = Router();

// Public Routes
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);

// Protected Routes
router.post("/", protect, admin, createRestaurant);
router.put("/:id", protect, admin, updateRestaurant);
router.delete("/:id", protect, admin, deleteRestaurant);

export default router;

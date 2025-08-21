import { Router } from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes can be added here in the future
router.get("/profile", protect, getUserProfile);

export default router;

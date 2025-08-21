const express = require("express");
const { getFoods, createFood } = require("../controllers/foodController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getFoods);
router.post("/", protect, admin, createFood); // optional: add new food

module.exports = router;

import {getFoods,createFood} from "../models/Food";

// @desc    Get all foods
// @route   GET /api/foods
// @access  Public
export async function getFoods(req, res) {
  try {
    const foods = await Food.find();
    res.json(
      {
        "message": "Food items retrieved successfully",
        "data": foods.map(food => {
          const foodData = food.toObject();
          foodData.id = foodData._id;
          delete foodData._id;
          delete foodData.__v;
          return foodData;
        })
      }
      , 200);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
}

// Optional: Add a new food
export async function createFood(req, res) {
  try {
    const { name, description, price, image } = req.body;
    const food = await Food.create({ name, description, price, image });
    res.status(200).json({
      "message": "Food item created successfully",
      "data": food
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
}

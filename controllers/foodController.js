import Food from "../models/Food.js";

// @desc    Get all foods
// @route   GET /api/foods
// @access  Public
export async function getFoods(req, res) {
  try {
    // Default values if not provided
    const page = parseInt(req.query.page) || 1;  // current page
    const limit = parseInt(req.query.limit) || 10; // items per page
    const skip = (page - 1) * limit;

    // Get total count
    const totalFoods = await Food.countDocuments();

    // Fetch foods with pagination
    const foods = await Food.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Food items retrieved successfully",
      meta: {
        total: totalFoods,
        page,
        limit,
        totalPages: Math.ceil(totalFoods / limit),
      },
      data: foods.map(food => {
        const foodData = food.toObject();
        foodData.id = foodData._id;
        delete foodData._id;
        delete foodData.__v;
        return foodData;
      })
    });
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

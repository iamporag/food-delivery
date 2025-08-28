import Restaurant from "../models/Restaurent.js";


// Create Restaurant

export const createRestaurant = async (req, res) => {
    try {
        const restaurant = new Restaurant({
            ...req.body,
            picture: req.file ? `/uploads/${req.file.filename}` : null
        });
        await restaurant.save();
        res.status(200).json(
            {
                message: "Restaurant created successfully",
                data: restaurant
            }
        )
    } catch (err) {
        res.status(500).json({
            message: err.message,
            data: null
        });
    }
};

// Get all Restaurants
export const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json({
            message: "Restaurants fetched successfully",
            data: restaurants
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            data: null
        });
    }
};

// Get a single Restaurant
export const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate("products");
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found",
                data: null
            });
        }
        res.status(200).json({
            message: "Restaurant fetched successfully",
            data: restaurant
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            data: null
        });
    }
};

// Update a Restaurant
export const updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found",
                data: null
            });
        }
        res.status(200).json({
            message: "Restaurant updated successfully",
            data: restaurant
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            data: null
        });
    }
};

/// Delete a Restaurant
export const deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found",
                data: null
            });
        }
        res.status(200).json({
            message: "Restaurant deleted successfully",
            data: restaurant
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            data: null
        });
    }
};

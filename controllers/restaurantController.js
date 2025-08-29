import Restaurant from "../models/Restaurent.js";
import { v2 as cloudinary } from "cloudinary";


// Create Restaurant

export const createRestaurant = async (req, res) => {
    try {
        const picture = req.file ? { url: req.file.path, public_id: req.file.filename } : null;
        const restaurant = new Restaurant.create({
            ...req.body,
            picture,
        });

        res.status(200).json({
            message: "Restaurant created successfully",
            data: restaurant
        });
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
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found", data: null });
        }

        // If new image uploaded, delete old one from Cloudinary
        if (req.file) {
            if (restaurant.picture?.public_id) {
                await cloudinary.uploader.destroy(restaurant.picture.public_id);
            }

            restaurant.picture = {
                url: req.file.path,
                public_id: req.file.filename,
            };
        }

        // Update other fields
        Object.assign(restaurant, req.body);

        await restaurant.save();

        res.status(200).json({
            message: "Restaurant updated successfully",
            data: restaurant,
        });
    } catch (err) {
        res.status(500).json({ message: err.message, data: null });
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

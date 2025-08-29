import { url } from "inspector";
import Restaurant from "../models/Restaurent.js";
import { v2 as cloudinary } from "cloudinary";


// Create Restaurant

export const createRestaurant = async (req, res) => {
  try {
    const data = req.body;

    // parse JSON fields
    if (data.location && typeof data.location === "string") data.location = JSON.parse(data.location);
    if (data.products && typeof data.products === "string") data.products = JSON.parse(data.products);

    // Cloudinary file
    if (req.file) {
      data.picture = {
        url: req.file.path,       // Cloudinary URL
        public_id: req.file.filename,
      };
    }

    const newRestaurant = await Restaurant.create(data);
    res.status(201).json({ data: newRestaurant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// Get all Restaurants with pagination
export const getAllRestaurants = async (req, res) => {
    try {
        // Get page from query params, default = 1
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // 10 items per page
        const skip = (page - 1) * limit;

        // Count total documents
        const total = await Restaurant.countDocuments();

        // Fetch paginated data
        const restaurants = await Restaurant.find()
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            message: "Restaurants fetched successfully",
            data: restaurants,
            pagination: {
                totalItems: total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                perPage: limit
            }
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
        if (req.file && restaurant.picture?.public_id) {
            await cloudinary.uploader.destroy(restaurant.picture.public_id);
        }

        if (req.file) {
            restaurant.picture = { url: req.file.path, public_id: req.file.filename };
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
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found",
                data: null
            });
        }

        // Delete image from Cloudinary if exists
        if (restaurant.picture?.public_id) {
            await cloudinary.uploader.destroy(restaurant.picture.public_id);
        }

        // Delete restaurant document
        await restaurant.deleteOne();

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


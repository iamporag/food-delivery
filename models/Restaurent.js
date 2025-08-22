import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        address: { type: String, required: true },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true,
            },
        },
        picture: { type: String },
        rating: { type: Number, default: 0 },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
        openTime: { type: String },
        closeTime: { type: String },
    },
    { timestamps: true }
);

restaurantSchema.index({ location: "2dsphere" }); // ✅ Geo support

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;

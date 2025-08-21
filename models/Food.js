import { Schema, model } from "mongoose";

const foodSchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default model("Food", foodSchema);

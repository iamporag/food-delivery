import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  foods: [
    {
      food: { type: Schema.Types.ObjectId, ref: "Food" },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "Pending" }
}, { timestamps: true });

export default model("Order", orderSchema);

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import cors from"cors";
import connectDB from "./config/db.js";
import foodRoutes from"./routes/foodRoutes.js";
import userRoutes from"./routes/userRoutes.js";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from "public"
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname,"public","home.html"));
});



// API routes
app.use("/api/users", userRoutes);
// app.use("/api/foods", foodRoutes);
// app.use("/api/orders", orderRoutes);
app.use("/api/foods", foodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

export default app;
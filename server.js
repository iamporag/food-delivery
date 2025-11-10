import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import connectDB from "./config/db.js";

// Import routes
import foodRoutes from "./routes/foodRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bdQuranRoutes from "./routes/bdQuranRoutes.js";

// ===========================================
// ✅ Fix __dirname for ES modules
// ===========================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===========================================
// ✅ Load environment variables
// ===========================================
dotenv.config();

// ===========================================
// ✅ Connect to MongoDB
// ===========================================
connectDB();

// ===========================================
// ✅ Initialize Express
// ===========================================
const app = express();

// ===========================================
// ✅ Middleware Setup
// ===========================================
app.use(cors({
  origin: "*", // or limit to your frontend domain later
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(helmet()); // Security headers
app.use(compression()); // Response compression
app.use(express.json({ limit: "10mb" })); // Handle large JSON
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // Logging

// ===========================================
// ✅ Static File Serving
// ===========================================
app.use(express.static(path.join(__dirname, "public")));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// ===========================================
// ✅ API Routes
// ===========================================
app.use("/api/bd_quran", bdQuranRoutes);
app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/restaurants", restaurantRoutes);

// ===========================================
// ✅ Health Check Route (for Railway monitoring)
// ===========================================
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", uptime: process.uptime() });
});

// ===========================================
// ✅ Global Error Handling (optional but good practice)
// ===========================================
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// ===========================================
// ✅ Start Server
// ===========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

export default app;

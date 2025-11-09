import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import BdQuran from "./models/bdQuranModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    const quranData = JSON.parse(fs.readFileSync("quran_bn.json", "utf-8"));

    await BdQuran.deleteMany();
    await BdQuran.insertMany(quranData);

    console.log("BD Quran data imported successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("Error importing data:", err);
    process.exit(1);
  });

import mongoose from "mongoose";

const verseSchema = new mongoose.Schema({
  id: Number,
  text: String,
  translation: String,
});

const bdQuranSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    transliteration: String,
    translation: String,
    type: String,
    total_verses: Number,
    verses: [verseSchema],
  },
  { collection: "bd_quran" }
);

export default mongoose.model("BdQuran", bdQuranSchema);

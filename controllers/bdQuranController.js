import BdQuran from "../models/bdQuranModel.js";

// ✅ Get all surahs
export const getAllSurahs = async (req, res) => {
  try {
    const surahs = await BdQuran.find();
    res.status(200).json(surahs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Quran data", error: error.message });
  }
};

// ✅ Get single surah by ID
export const getSurahById = async (req, res) => {
  try {
    const surah = await BdQuran.findOne({ id: parseInt(req.params.id) });
    if (!surah) {
      return res.status(404).json({ message: "Surah not found" });
    }
    res.status(200).json(surah);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Surah", error: error.message });
  }
};

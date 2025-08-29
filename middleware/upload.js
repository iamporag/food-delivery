// upload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; // make sure this exports cloudinary correctly

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "restaurants",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Multer instance
const upload = multer({ storage });

export default upload;

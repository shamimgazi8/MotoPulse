import express from "express";
import { uploadToCloudinary } from "../utils/cloudinary";

const router = express.Router();

router.post(
  "/",
  uploadToCloudinary.single("cover"),
  async (req, res): Promise<any> => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      url: req.file.path,
      public_id: req.file.filename,
    });
  }
);

export default router;

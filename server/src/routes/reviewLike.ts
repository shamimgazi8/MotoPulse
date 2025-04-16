import express from "express";
import { likeReview, unlikeReview } from "../controllers/reviewLikeController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// Existing routes...

router.post("/:reviewId", authMiddleware, likeReview);
router.delete("/:reviewId", authMiddleware, unlikeReview);

export default router;

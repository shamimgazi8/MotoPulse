import express from "express";
import {
  getReviewsLikedByUser,
  likeReview,
  unlikeReview,
} from "../controllers/reviewLikeController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/:reviewId", authMiddleware, likeReview);
router.delete("/:reviewId", authMiddleware, unlikeReview);

router.get("/:userId", getReviewsLikedByUser);

export default router;

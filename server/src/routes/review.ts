import { Router } from "express";
import {
  getAllReviews,
  createReview,
  getReviewBySlug,
  getReviewsByBikeId,
  getReviewsByUserId,
  updateReviewByUser,
  deleteReviewByUser,
} from "../controllers/reviewController";

const router = Router();

router.get("/", getAllReviews);
router.post("/", createReview as any);
router.get("/:slug", getReviewBySlug as any);
router.get("/bike/:bikeId", getReviewsByBikeId);
router.get("/user/:userId", getReviewsByUserId);
router.put("/:reviewId", updateReviewByUser as any);
router.delete("/:reviewId", deleteReviewByUser as any);
export default router;

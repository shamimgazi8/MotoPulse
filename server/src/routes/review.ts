import { Router } from "express";
import {
  getAllReviews,
  createReview,
  getReviewBySlug,
  getReviewsByBikeId,
} from "../controllers/reviewController";

const router = Router();

router.get("/", getAllReviews);
router.post("/", createReview as any);
router.get("/:slug", getReviewBySlug as any);
router.get("/bike/:bikeId", getReviewsByBikeId);
export default router;

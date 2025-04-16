import { Router } from "express";
import { getAllReviews, createReview } from "../controllers/reviewController";

const router = Router();

router.get("/", getAllReviews);
router.post("/", createReview as any);

export default router;

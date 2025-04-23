import express from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByReview,
} from "../controllers/commentController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/review/:reviewId", getCommentsByReview as any);
router.post("/", authMiddleware, createComment);
router.put("/:id", authMiddleware, updateComment as any);
router.delete("/:id", authMiddleware, deleteComment as any);

export default router;

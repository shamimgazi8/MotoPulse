import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  bookmarkReview,
  getUserBookmarks,
  unbookmarkReview,
} from "../controllers/BookmarkController";

const router = express.Router();

// POST /api/bookmarks  - bookmark a review
router.post("/", authMiddleware, bookmarkReview as any);

// DELETE /api/bookmarks/:review_id  - unbookmark a review
router.delete("/", authMiddleware, unbookmarkReview as any);

// GET /api/bookmarks  - get all user's bookmarked reviews
router.get("/", authMiddleware, getUserBookmarks as any);

export default router;

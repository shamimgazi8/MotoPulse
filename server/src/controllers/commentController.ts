import { Request, Response } from "express";
import Comment from "../models/comment";
import User from "../models/User";

export const getCommentsByReview = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;

    const comments = await Comment.findAll({
      where: { review_id: reviewId },
      include: [
        {
          model: User,
          attributes: ["id", "email"], // Use 'email' instead of 'username'
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // If no comments are found, return an empty array
    return res.json({ comments: comments || [] });
  } catch (err) {
    console.error("Error fetching comments:", err); // Log the error
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { review_id, content } = req.body;
    const user_id = req.user.id; // Assuming JWT middleware adds this
    const comment = await Comment.create({ review_id, content, user_id });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findByPk(id);

    if (!comment || comment.user_id !== req.user.id) {
      return res.status(403).json({ error: "Not authorized or not found" });
    }

    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to update comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);

    if (!comment || comment.user_id !== req.user.id) {
      return res.status(403).json({ error: "Not authorized or not found" });
    }

    await comment.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

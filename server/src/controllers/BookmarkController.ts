import { Request, Response } from "express";

import Review from "../models/Review";
import ReviewBookmark from "../models/RevieBookmark";

export const bookmarkReview = async (req: Request, res: Response) => {
  const { review_id } = req.body;
  const user_id = req.user?.id; // Assuming you have user attached from auth middleware

  try {
    const [bookmark, created] = await ReviewBookmark.findOrCreate({
      where: { user_id, review_id },
    });

    if (!created) {
      return res.status(400).json({ message: "Already bookmarked." });
    }

    return res
      .status(201)
      .json({ message: "Review bookmarked successfully.", bookmark });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const unbookmarkReview = async (req: Request, res: Response) => {
  const { review_id } = req.params;
  const user_id = req.user?.id;

  try {
    const deleted = await ReviewBookmark.destroy({
      where: { user_id, review_id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Bookmark not found." });
    }

    return res.status(200).json({ message: "Bookmark removed successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const getUserBookmarks = async (req: Request, res: Response) => {
  const user_id = req.user?.id;

  try {
    const bookmarks = await ReviewBookmark.findAll({
      where: { user_id },
      include: [
        {
          model: Review,
          as: "review",
        },
      ],
    });

    return res.status(200).json({ bookmarks });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong.", error });
  }
};

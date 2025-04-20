import Review from "../models/Review";
import ReviewLike from "../models/reviewLike";

export const likeReview = async (req: any, res: any) => {
  const { reviewId } = req.params;
  const userId = req.user.id;

  try {
    const [like, created] = await ReviewLike.findOrCreate({
      where: { review_id: reviewId, user_id: userId },
    });

    if (!created) {
      return res.status(400).json({ message: "You already liked this review" });
    }

    await Review.increment("like_count", { where: { id: reviewId } });

    return res.status(200).json({ message: "Review liked" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: error });
  }
};

export const unlikeReview = async (req: any, res: any) => {
  const { reviewId } = req.params;
  const userId = req.user.id;

  try {
    const deleted = await ReviewLike.destroy({
      where: { review_id: reviewId, user_id: userId },
    });

    if (deleted) {
      await Review.decrement("like_count", { where: { id: reviewId } });
      return res.status(200).json({ message: "Review unliked" });
    } else {
      return res.status(404).json({ message: "Like not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: error });
  }
};
export const getReviewsLikedByUser = async (req: any, res: any) => {
  const { userId } = req.params; // Get the user ID from params

  try {
    // Fetch the review IDs where this user has liked
    const likes = await ReviewLike.findAll({
      where: { user_id: userId },
      attributes: ["review_id"], // Only interested in the review IDs
    });

    if (!likes || likes.length === 0) {
      return res
        .status(200)
        .json({ message: "This user has not liked any reviews yet" });
    }

    // Extract the review IDs from the likes
    const reviewIds = likes.map((like) => like.review_id);

    // Optionally, fetch the actual review details if needed
    const reviews = await Review.findAll({
      where: {
        id: reviewIds,
      },
      attributes: ["id", "review", "like_count"], // You can adjust this based on what info you need
    });

    return res.status(200).json({ reviews });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: error });
  }
};

import { Request, Response } from "express";
import Review from "../models/Review";
import BikeList from "../models/BikeList";
import User from "../models/User";
import Brand from "../models/Brand";
import Model from "../models/Model";
import BikeType from "../models/BikeType";

import { buildReviewFilters } from "../helpers/reviewFilters";
import Comment from "../models/comment";

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const {
      reviewWhere,
      brandWhere,
      modelWhere,
      typeWhere,
      engineCCFilter,
      order,
      brandName,
      modelName,
      search,
      type,
    } = buildReviewFilters(req.query);

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    // Construct bike filter based on engineCC
    const bikeWhere: any = {};
    if (
      Object.keys(engineCCFilter).length > 0 ||
      Object.getOwnPropertySymbols(engineCCFilter).length > 0
    ) {
      bikeWhere.engineCC = engineCCFilter;
    }

    const reviews = await Review.findAndCountAll({
      where: reviewWhere,
      limit,
      offset,
      order,
      attributes: { exclude: ["bike_id", "user_id"] },
      include: [
        {
          model: User,
          attributes: ["id", "firstname", "lastname", "email", "profile_url"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "content", "createdAt"],
          include: [
            {
              model: User,
              attributes: [
                "id",
                "firstname",
                "lastname",
                "email",
                "profile_url",
              ],
            },
          ],
        },
        {
          model: BikeList,
          as: "bike",
          required: true,
          where: bikeWhere,
          attributes: [
            "id",
            "imgUrl",
            "engineCC",
            "horsePower",
            "torque",
            "weight",
            "brand_id",
            "model_id",
            "bike_type_id",
          ],
          include: [
            {
              model: Brand,
              as: "brand",
              attributes: ["id", "brandName"],
              where: Object.keys(brandWhere).length ? brandWhere : undefined,
              required: !!brandName || !!search,
            },
            {
              model: Model,
              as: "model",
              attributes: ["id", "modelName"],
              where: Object.keys(modelWhere).length ? modelWhere : undefined,
              required: !!modelName || !!search,
            },
            {
              model: BikeType,
              as: "type",
              attributes: ["id", "name"],
              where: Object.keys(typeWhere).length ? typeWhere : undefined,
              required: !!type,
            },
          ],
        },
      ],
    });

    // Return paginated results
    res.status(200).json({
      count: reviews.count,
      currentPage: page,
      totalPages: Math.ceil(reviews.count / limit),
      result: reviews.rows,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      message: "Error fetching reviews",
      error,
    });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const { bike_id, user_id, review, like_count, coverPhoto } = req.body;

    // Check if the bike exists
    const bike = await BikeList.findByPk(bike_id);
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    // Check if the user exists (optional)
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new review with the coverPhoto field
    const newReview = await Review.create({
      bike_id,
      user_id,
      review,
      like_count: like_count ?? 0, // default to 0 if not provided
      coverPhoto, // Include the coverPhoto in the review creation
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
};
export const getReviewBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const review = await Review.findOne({
      where: { slug },
      include: [
        {
          model: User,
          attributes: ["id", "firstname", "lastname", "profile_url"],
        },
        {
          model: BikeList,
          as: "bike", // Assuming 'bike' is the alias in the Review model association
          required: true,
          attributes: [
            "id",
            "imgUrl",
            "engineCC",
            "horsePower",
            "torque",
            "weight",
          ],
          include: [
            {
              model: Brand,
              as: "brand",
              attributes: ["id", "brandName"],
            },
            {
              model: Model,
              as: "model",
              attributes: ["id", "modelName"],
            },
            {
              model: BikeType,
              as: "type",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error fetching review", error });
  }
};

export const getReviewsByBikeId = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;

    const reviews = await Review.findAll({
      where: { bike_id: bikeId },
      include: [
        {
          model: User,
          attributes: ["id", "firstname", "lastname", "email", "profile_url"],
        },
        {
          model: BikeList,
          as: "bike",
          required: true,
          attributes: [
            "id",
            "imgUrl",
            "engineCC",
            "horsePower",
            "torque",
            "weight",
          ],
          include: [
            {
              model: Brand,
              as: "brand",
              attributes: ["id", "brandName"],
            },
            {
              model: Model,
              as: "model",
              attributes: ["id", "modelName"],
            },
            {
              model: BikeType,
              as: "type",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews by bike ID:", error);
    res
      .status(500)
      .json({ message: "Error fetching reviews by bike ID", error });
  }
};

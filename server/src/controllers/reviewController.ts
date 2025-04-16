import { Request, Response } from "express";
import Review from "../models/Review";
import BikeList from "../models/BikeList";
import User from "../models/User";
import Brand from "../models/Brand";
import Model from "../models/Model";
import BikeType from "../models/BikeType";
import { Op } from "sequelize";

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      type, // ← changed from type_id
      min_likes,
      max_likes,
      search,
      brandName,
      modelName,
    } = req.query;

    const reviewWhere: any = {
      ...(user_id && { user_id }),
      ...(search && {
        review: { [Op.iLike]: `%${search}%` },
      }),
      ...(min_likes || max_likes
        ? {
            like_count: {
              ...(min_likes && { [Op.gte]: Number(min_likes) }),
              ...(max_likes && { [Op.lte]: Number(max_likes) }),
            },
          }
        : {}),
    };

    const brandInclude = {
      model: Brand,
      as: "brand",
      attributes: ["id", "brandName"],
      required: !!brandName,
      ...(brandName && {
        where: {
          brandName: { [Op.iLike]: `%${brandName}%` },
        },
      }),
    };

    const modelInclude = {
      model: Model,
      as: "model",
      attributes: ["id", "modelName"],
      required: !!modelName,
      ...(modelName && {
        where: {
          modelName: { [Op.iLike]: `%${modelName}%` },
        },
      }),
    };

    const typeInclude = {
      model: BikeType,
      as: "type",
      attributes: ["id", "name"],
      required: !!type,
      ...(type && {
        where: {
          name: { [Op.iLike]: `%${type}%` },
        },
      }),
    };

    const reviews = await Review.findAll({
      where: reviewWhere,
      attributes: { exclude: ["bike_id", "user_id"] },
      include: [
        {
          model: User,
          attributes: ["id", "firstname", "lastname", "email"],
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
          include: [brandInclude, modelInclude, typeInclude],
        },
      ],
    });

    res.status(200).json({
      count: reviews?.length,
      result: reviews,
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
    const { bike_id, user_id, review, like_count } = req.body;

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

    const newReview = await Review.create({
      bike_id,
      user_id,
      review,
      like_count: like_count ?? 0, // default to 0 if not provided
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
};

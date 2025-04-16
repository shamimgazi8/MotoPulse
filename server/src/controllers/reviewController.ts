import { Request, Response } from "express";
import Review from "../models/Review";
import BikeList from "../models/BikeList";
import User from "../models/User";
import Brand from "../models/Brand";
import Model from "../models/Model";
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.findAll({
      attributes: { exclude: ["bike_id", "user_id"] },
      include: [
        {
          model: User,
          attributes: ["id", "firstname", "lastname", "email"],
        },
        {
          model: BikeList,
          as: "bike",
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
              attributes: ["id", "brandName"], // Fetch the brand name
            },
            {
              model: Model,
              as: "model",
              attributes: ["id", "modelName"], // Fetch the model name
            },
          ],
        },
      ],
    });

    res.status(200).json(reviews);
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

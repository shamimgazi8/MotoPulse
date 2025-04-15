import { Request, Response } from "express";
import Brand from "../models/Brand";
import User from "../models/User";

export const getAllBrands = async (_req: Request, res: Response) => {
  try {
    const brands = await Brand.findAll({
      include: [
        {
          model: User, // Include the User model
          as: "user", // Alias for the association
          attributes: ["id", "firstname", "email"], // Specify the attributes you want to include from the User model (modify this as needed)
        },
      ],
    });

    res.json(brands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching brands" });
  }
};

export const createBrand = async (req: Request, res: Response) => {
  const { user_id, brandName, country } = req.body;

  // Validate required fields
  if (!user_id || !brandName) {
    return res
      .status(400)
      .json({ error: "user_id and brandName are required" });
  }

  try {
    const brand = await Brand.create({ user_id, brandName, country });
    res.status(201).json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating brand" });
  }
};

import { Request, Response } from "express";
import BikeList from "../models/BikeList";

// Get all bikes from the database
export const getAllBikes = async (_req: Request, res: Response) => {
  try {
    const bikes = await BikeList.findAll({
      attributes: {
        exclude: ["brand_id", "model_id", "bike_type_id"],
      },
      include: ["brand", "model", "type"],
    });

    res.json(bikes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bikes", error });
  }
};

export const createBike = async (req: Request, res: Response) => {
  const {
    brand_id,
    model_id,
    bike_type_id,
    imgUrl,
    engineCC,
    horsePower,
    torque,
    weight,
  } = req.body;

  try {
    const bike = await BikeList.create({
      brand_id,
      model_id,
      bike_type_id, // ensure this matches the model field name
      imgUrl,
      engineCC,
      horsePower,
      torque,
      weight,
    });

    res.status(201).json(bike);
  } catch (error) {
    res.status(500).json({ message: "Error creating bike", error });
  }
};

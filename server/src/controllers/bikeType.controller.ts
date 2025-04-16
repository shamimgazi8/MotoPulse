import { Request, Response } from "express";
import BikeType from "../models/BikeType";

export const getAllBikeTypes = async (_req: Request, res: Response) => {
  try {
    const types = await BikeType.findAll();
    res.json({ count: types?.length, result: types });
  } catch (error) {
    res.status(500).json({ message: "Error fetching bike types", error });
  }
};

export const createBikeType = async (req: Request, res: Response) => {
  const { name } = req.body; // Use 'name' instead of 'typeName'

  try {
    const bikeType = await BikeType.create({ name });
    res.status(201).json(bikeType);
  } catch (error) {
    res.status(500).json({ message: "Error creating bike type", error });
  }
};

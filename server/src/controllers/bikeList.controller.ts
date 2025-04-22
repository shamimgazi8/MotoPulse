import { Request, Response } from "express";
import BikeList from "../models/BikeList";
import { Op } from "sequelize";

// Get all bikes from the database
export const getAllBikes = async (req: Request, res: Response) => {
  try {
    const { brandId, modelId, typeId, ccMin, ccMax } = req.query;

    // Construct dynamic filter object
    const whereClause: any = {};
    if (brandId) whereClause.brand_id = brandId;
    if (modelId) whereClause.model_id = modelId;
    if (typeId) whereClause.bike_type_id = typeId;

    // Add engineCC range filtering
    if (ccMin || ccMax) {
      whereClause.engineCC = {};
      if (ccMin) whereClause.engineCC[Op.gte] = Number(ccMin);
      if (ccMax) whereClause.engineCC[Op.lte] = Number(ccMax);
    }

    const bikes = await BikeList.findAll({
      where: whereClause,
      attributes: {
        exclude: ["brand_id", "model_id", "bike_type_id"],
      },
      include: ["brand", "model", "type"],
    });

    res.json({ count: bikes.length, result: bikes });
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
    // Check if bike already exists
    const existingBike = await BikeList.findOne({
      where: {
        brand_id,
        model_id,
        bike_type_id,
      },
    });

    // If it exists, return it instead of creating a new one
    if (existingBike) {
      return res
        .status(200)
        .json({ bike: existingBike, message: "Bike already exists" });
    }

    // Otherwise, create a new one
    const bike = await BikeList.create({
      brand_id,
      model_id,
      bike_type_id,
      imgUrl,
      engineCC,
      horsePower,
      torque,
      weight,
    });

    res.status(201).json({ bike });
  } catch (error) {
    res.status(500).json({ message: "Error creating bike", error });
  }
};

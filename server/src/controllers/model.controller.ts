import { Request, Response } from "express";
import BikeModel from "../models/Model";
import Brand from "../models/Brand"; // Import Brand for inclusion

export const getAllModels = async (_req: Request, res: Response) => {
  try {
    const models = await BikeModel.findAll({
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["id", "brandName"], // Only include brand id and name
        },
      ],
    });
    res.json({ count: models?.length, result: models });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch models" });
  }
};

export const createModel = async (req: Request, res: Response) => {
  const { brand_id, manufacturer, modelName, year } = req.body;

  if (!brand_id || !manufacturer || !modelName || !year) {
    return res.status(400).json({
      error: "brand_id, manufacturer, modelName, and year are required",
    });
  }

  try {
    const model = await BikeModel.create({
      brand_id,
      manufacturer,
      modelName,
      year,
    });

    // Fetch the model again including the brand data
    const createdModelWithBrand = await BikeModel.findByPk(model.id, {
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["id", "brandName"],
        },
      ],
    });

    res.status(201).json(createdModelWithBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create model" });
  }
};

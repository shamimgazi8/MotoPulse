import { Router } from "express";
import Model from "../models/Model";
import Brand from "../models/Brand";
import Manufacturer from "../models/Manufacturer";
import BikeType from "../models/BikeType";

const router = Router();

router.get("/", async (_req, res) => {
  const models = await Model.findAll({
    include: [Brand, Manufacturer, BikeType],
  });
  res.json(models);
});

router.post("/", async (req, res) => {
  const model = await Model.create(req.body);
  res.status(201).json(model);
});

export default router;

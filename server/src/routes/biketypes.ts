import { Router } from "express";
import Manufacturer from "../models/Manufacturer";

const router = Router();

router.get("/", async (_req, res) => {
  const manufacturers = await Manufacturer.findAll();
  res.json(manufacturers);
});

router.post("/", async (req, res) => {
  const manufacturer = await Manufacturer.create(req.body);
  res.status(201).json(manufacturer);
});

export default router;

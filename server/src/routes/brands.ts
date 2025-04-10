import { Router } from "express";
import Brand from "../models/Brand";

const router = Router();

router.get("/", async (_req, res) => {
  const brands = await Brand.findAll();
  res.json(brands);
});

router.post("/", async (req, res) => {
  const brand = await Brand.create(req.body);
  res.status(201).json(brand);
});

export default router;

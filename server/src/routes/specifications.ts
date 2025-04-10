import { Router } from "express";
import Specification from "../models/Specification";
import Model from "../models/Model";

const router = Router();

router.get("/", async (_req, res) => {
  const specs = await Specification.findAll({ include: [Model] });
  res.json(specs);
});

router.post("/", async (req, res) => {
  const spec = await Specification.create(req.body);
  res.status(201).json(spec);
});

export default router;

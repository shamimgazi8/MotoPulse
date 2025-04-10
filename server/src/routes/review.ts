import { Router } from "express";
import Review from "../models/Review";
import User from "../models/User";
import Model from "../models/Model";

const router = Router();

router.get("/", async (_req, res) => {
  const reviews = await Review.findAll({ include: [User, Model] });
  res.json(reviews);
});

router.post("/", async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json(review);
});

export default router;

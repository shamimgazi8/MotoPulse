import { Router } from "express";
import User from "../models/User";

const router = Router();

router.get("/", async (_req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

export default router;

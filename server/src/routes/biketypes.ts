import { Router } from "express";
import {
  getAllBikeTypes,
  createBikeType,
} from "../controllers/bikeType.controller";
const router = Router();

router.get("/", getAllBikeTypes);
router.post("/", createBikeType);

export default router;

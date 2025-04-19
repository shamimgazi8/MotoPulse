import { Router } from "express";
import { getAllBikes, createBike } from "../controllers/bikeList.controller";
const router = Router();

router.get("/", getAllBikes);
router.post("/", createBike as any);

export default router;

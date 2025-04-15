import { Router } from "express";
import { getAllModels, createModel } from "../controllers/model.controller";
const router = Router();

router.get("/", getAllModels);
router.post("/", createModel as any);

export default router;

import { Router } from "express";
import { getAllBrands, createBrand } from "../controllers/brand.controller";
import authMiddleware from "../middleware/authMiddleware";
const router = Router();

router.get("/", getAllBrands);
router.post("/", authMiddleware, createBrand as any);

export default router;

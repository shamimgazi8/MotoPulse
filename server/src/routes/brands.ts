import { Router } from "express";
import { getAllBrands, createBrand } from "../controllers/brand.controller";
const router = Router();

router.get("/", getAllBrands);
router.post("/", createBrand as any);

export default router;

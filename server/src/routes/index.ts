import { Router } from "express";
import userRoutes from "./users";
import brandRoutes from "./brands";
import manufacturerRoutes from "./manufactures";
import modelRoutes from "./model";
import specificationRoutes from "./specifications";
import bikeTypeRoutes from "./biketypes";
import reviewRoutes from "./review";
import authRoutes from "./auth";
const router = Router();

router.use("/users", userRoutes);

router.use("/auth", authRoutes);

router.use("/brands", brandRoutes);
router.use("/manufacturers", manufacturerRoutes);
router.use("/models", modelRoutes);
router.use("/specifications", specificationRoutes);
router.use("/biketypes", bikeTypeRoutes);
router.use("/reviews", reviewRoutes);

export default router;

import { Router } from "express";
import userRoutes from "./users";
import brandRoutes from "./brands";
import manufacturerRoutes from "./manufactures";
import modelRoutes from "./model";
import specificationRoutes from "./specifications";
import bikeTypeRoutes from "./biketypes";
import reviewRoutes from "./review";
import sequelize from "../config/db";

const router = Router();

router.use("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send("Welcome to MotoPulse Database!");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    res.status(500).send("Database connection failed.");
  }
});
router.use("/users", userRoutes);
router.use("/brands", brandRoutes);
router.use("/manufacturers", manufacturerRoutes);
router.use("/models", modelRoutes);
router.use("/specifications", specificationRoutes);
router.use("/biketypes", bikeTypeRoutes);
router.use("/reviews", reviewRoutes);

export default router;

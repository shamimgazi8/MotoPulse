import { Router } from "express";
import userRoutes from "./users";
import authRoutes from "./auth";
import brandRoutes from "./brands"; // Import brand routes
import modelRoutes from "./model"; // Import model routes
import bikeTypeRoutes from "./biketypes"; // Import bike type routes
import bikeListRoutes from "./bikeList"; // Import bike list routes

const router = Router();

// Existing routes
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

// New routes for Bike models, Brand, BikeType, and BikeList
router.use("/brands", brandRoutes); // Route for brand
router.use("/models", modelRoutes); // Route for model
router.use("/bikeTypes", bikeTypeRoutes); // Route for bike types
router.use("/bikeLists", bikeListRoutes); // Route for bike lists

export default router;

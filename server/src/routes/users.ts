import { Router } from "express";
import GetUsers from "../controllers/getUserController";

import CreateUser from "../controllers/createUserController";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/getProfileController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// GET /users — fetch all users
router.get("/", GetUsers);

// POST /users — create a new user
router.post("/", CreateUser);
router.post("/profile/:id", authMiddleware, getUserProfile);
router.put("/profile/:id", authMiddleware, updateUserProfile as any);

export default router;

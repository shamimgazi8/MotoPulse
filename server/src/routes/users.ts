import { Router } from "express";
import GetUsers from "../controllers/getUserController";

import CreateUser from "../controllers/createUserController";
import { getUserProfile } from "../controllers/getProfileController";

const router = Router();

// GET /users — fetch all users
router.get("/", GetUsers);

// POST /users — create a new user
router.post("/", CreateUser);
router.post("/profile/:id", getUserProfile);

export default router;

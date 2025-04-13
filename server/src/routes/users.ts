import { Router } from "express";
import GetUsers from "../controllers/getUserController";

import CreateUser from "../controllers/createUserController";

const router = Router();

// GET /users — fetch all users
router.get("/", GetUsers);

// POST /users — create a new user
router.post("/", CreateUser);

export default router;

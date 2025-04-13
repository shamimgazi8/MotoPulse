// routes/auth.ts
import { Router } from "express";
import { loginUser } from "../controllers/LoginController";

const router = Router();

router.post("/", loginUser as any);

export default router;

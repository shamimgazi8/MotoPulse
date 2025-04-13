// routes/auth.ts
import { Router } from "express";
import { loginUser } from "../controllers/LoginController";
import { logoutUser } from "../controllers/logOutController";

const router = Router();

router.post("/login", loginUser as any);
// Handle user logout (informing the client to delete the token)
router.post("/logout", logoutUser);

export default router;

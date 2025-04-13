// controllers/authController.ts
import { Request, Response } from "express";

export const logoutUser = async (_req: Request, res: Response) => {
  try {
    // You can add any server-side logic you need (e.g., blacklisting JWT if you have a refresh token system)
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    // For a stateless JWT system, just inform the client to delete the token
    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

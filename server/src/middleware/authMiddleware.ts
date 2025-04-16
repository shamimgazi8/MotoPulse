import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const JWT_SECRET = process.env.JWT_SECRET || "fallbackSecret";
const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number }; // Cast as needed

    // Assuming decoded contains the user ID
    req.user = { id: decoded.id }; // Add the user object to req

    next(); // Call next to pass control to the next middleware/handler
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;

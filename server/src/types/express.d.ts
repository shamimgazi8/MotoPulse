// src/types/express.d.ts
import { User } from "../models/user.model"; // Adjust as needed

declare module "express" {
  interface Request {
    user?: User;
  }
}

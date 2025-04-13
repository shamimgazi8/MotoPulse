import { Request, Response } from "express";
import User from "../models/User";

const GetUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();

    res.json({
      message: "success",
      data: users.length ? users : "No users found",
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

export default GetUsers;

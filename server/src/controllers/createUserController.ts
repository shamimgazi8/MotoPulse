import { Request, Response } from "express";
import User from "../models/User";

const CreateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      data: user, // toJSON() automatically removes password
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create user", error: err });
  }
};

export default CreateUser;

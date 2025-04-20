import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user); // password is hidden by .toJSON()
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { address, profile_url, oldPassword, newPassword } = req.body;

    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Handle password update
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect old password" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    if (address !== undefined) user.address = address;
    if (profile_url !== undefined) user.profile_url = profile_url;

    await user.save();

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user: user.toJSON() });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

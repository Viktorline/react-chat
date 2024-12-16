import express, { Request, Response } from "express";
import { Model } from "mongoose";
import User from "../models/User";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  const { query, excludeId } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ message: "Search query is required and must be a string" });
  }

  try {
    const users = await User.find({
      $or: [{ username: { $regex: query, $options: "i" } }],
      _id: { $ne: excludeId },
    }).select("-password");

    res.json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

import express, { Request, Response, NextFunction } from "express";
import User from "../models/User";

const router = express.Router();

router.get("/search", (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query.query as string | undefined;
    const excludeId = req.query.excludeId as string | undefined;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Search query is required and must be a string" });
    }

    const users = await User.find({
      $or: [{ username: { $regex: query, $options: "i" } }],
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    }).select("-password");

    return res.json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    next(error);
  }
}) as express.RequestHandler);

export default router;

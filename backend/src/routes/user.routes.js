import { Router } from "express";
import User from "../models/user.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:id", verifyJWT, async (req, res) => {
  try {
    if (
      req.user.role !== "admin" &&
      req.params.id !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

export default router;

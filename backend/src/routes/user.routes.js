import { Router } from "express";
import User from "../models/user.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import Incident from "../models/incident.model.js";

const router = Router();

router.get("/incidents/all", verifyJWT, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    const incidents = await Incident.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      incidents,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

router.get("/:id", verifyJWT, async (req, res) => {
  try {
    if (
      req.user.role !== "admin" &&
      req.params.id !== req.user._id.toString()
    ) {
      await Incident.create({
        user: req.user._id,
        targetUser: req.params.id,
        action: "Unauthorized access attempt",
        status: "Blocked",
      });

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

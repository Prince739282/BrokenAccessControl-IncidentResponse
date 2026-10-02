import User from "../models/user.model.js";
import Incident from "../models/incident.model.js";

const getUserById = async (req, res) => {
  try {
    const requestedUserId = req.params.id;

    if (req.user._id.toString() !== requestedUserId) {
      await Incident.create({
        user: req.user._id,
        targetUser: requestedUserId,
        action: "Unauthorized access attempt",
        status: "Blocked",
      });

      return res.status(403).json({
        message: "Access denied",
      });
    }

    const user = await User.findById(requestedUserId).select("-password");

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
      error: error.message,
    });
  }
};

export { getUserById };

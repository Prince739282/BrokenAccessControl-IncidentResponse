import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/dashboard", verifyJWT, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome to admin dashboard",
    user: req.user,
  });
});

export default router;

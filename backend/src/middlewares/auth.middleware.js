import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
constverifyJWT = async (req,res,next)=>{
       try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
          return res.status(401).json({
            message: "Unauthorized request",
          });
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id).select("-password");
        if (!user) {
          return res.status(401).json({
            message: "Invalid access token",
          });
        }
        req.user = user;
        next();
       } catch (error) {
        return res.status(401).json({
          message: "Invalid access token",
        });
       } 
}
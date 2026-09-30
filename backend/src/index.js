import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(cors());
app.use(express.json);
app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("mongodb connection error", err);
    process.exit(1);
  });

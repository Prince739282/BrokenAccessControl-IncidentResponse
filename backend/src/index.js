import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";


dotenv.config({
  path:"./.env",
})

const app = express();

app.use(cors());
app.use(express.json);

connectDB();
app.get("/", (req, res) => {
  res.json({
    message: "Broken Access Control API is running"
  })
})
const PORT =process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
 
const app = express();
app.use(cors());
app.use(express.json());
 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
 
app.get("/", (req, res) => {
  res.send("API is running");
});
 
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
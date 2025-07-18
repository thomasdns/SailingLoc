import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./Routes/auth.js";
import contactRoutes from './Routes/contact.js';
import userRoutes from './Routes/user.js';

dotenv.config();
 
const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
connectDB();

// Configuration des routes
app.use("/api/auth", authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/user', userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
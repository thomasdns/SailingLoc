import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import boatRoutes from "./routes/boat.js";
import bookingRoutes from "./routes/bookings.js";
import reviewRoutes from "./routes/reviews.js";
import contactRoutes from './routes/contact.js';
import userRoutes from './routes/user.js';
import paymentRoutes from './routes/payment.js';
import favoriteRoutes from './routes/favorites.js';

dotenv.config();
 
const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
connectDB();

// Configuration des routes
app.use("/api/auth", authRoutes);
app.use("/api/boats", boatRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/user', userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/payment', paymentRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
}
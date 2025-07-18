import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

// Register
router.post("/register", async (req, res) => {
  try {
    // Extract data from request body
    const { email, password, nom, prenom, tel, role } = req.body;

    // Validation du numéro de téléphone
    if (typeof tel !== "string" || !/^[0-9]{10}$/.test(tel)) {
      return res.status(400).json({
        message:
          "Le champ téléphone doit contenir exactement 10 chiffres (0-9), sans espaces ni caractères spéciaux.",
      });
    }
    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }
    // Check if user already exists with this email
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Un utilisateur existe déjà avec cet email." });
    }
    // Create new user
    user = new User({
      email,
      password,
      nom,
      prenom,
      tel,
      role: role || "user",
    });
    await user.save();
    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET
        ? String(process.env.JWT_SECRET)
        : "your-secret-key",
      {
        expiresIn: process.env.JWT_EXPIRE
          ? String(process.env.JWT_EXPIRE)
          : "24h",
      }
    );
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        tel: user.tel,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET
        ? String(process.env.JWT_SECRET)
        : "your-secret-key",
      {
        expiresIn: process.env.JWT_EXPIRE
          ? String(process.env.JWT_EXPIRE)
          : "24h",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        tel: user.tel,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

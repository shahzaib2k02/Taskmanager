// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = process.env.JWT_SECRET || "secret123";

// Signup
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, {
      expiresIn: "1d",
    });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

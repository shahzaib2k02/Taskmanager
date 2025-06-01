const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://taskmanager-omega-one.vercel.app", // your Vercel frontend
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/tasks", require("./routes/taskRoutes")); // Task CRUD + assign + complete
app.use("/api/auth", require("./routes/auth")); // Signup, Login
app.use("/api/users", require("./routes/user")); // Get all users (admin-side)

module.exports = app;

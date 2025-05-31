// middleware/auth.js
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "secret123";

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  next();
};

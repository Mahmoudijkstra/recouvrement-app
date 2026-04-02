const jwt = require("jsonwebtoken");
const response = require("../utils/response");

// Needs to be updated later for access token and refresh token
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.error(res, "Token missing", 401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return response.error(res, "Invalid or expired token", 403);
    }

    req.user = decoded;
    next();
  });
}

function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return response.error(res, "Access denied", 403);
  }
  next();
}

function managerOnly(req, res, next) {
  if (!req.user || req.user.role === "agent") {
    return response.error(res, "Access denied", 403);
  }
  next();
}

module.exports = { authenticate, adminOnly, managerOnly };

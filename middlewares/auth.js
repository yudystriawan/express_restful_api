const { verifyToken } = require("../services/jwt");

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const type = authHeader && authHeader.split(" ")[0];
  const token = authHeader && authHeader.split(" ")[1];

  if (type != "Bearer")
    return res.status(400).json({
      message: "Access denied. Type token invalid",
    });

  if (token == null)
    return res.status(401).json({
      message: "Access denied. No token provided",
    });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Token invalid",
    });
  }
}

module.exports = auth;

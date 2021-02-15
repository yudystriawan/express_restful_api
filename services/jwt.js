const jwt = require("jsonwebtoken");
const config = require("config");

function generateToken(User) {
  const userInfo = {
    id: User.id,
    name: User.name,
    email: User.email,
  };

  const token = jwt.sign(userInfo, config.get("jwtSecretKey"));

  return token;
}

function verifyToken(token) {
  return jwt.verify(token, config.get("jwtSecretKey"));
}

exports.generateToken = generateToken;
exports.verifyToken = verifyToken;

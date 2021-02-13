const jwt = require("jsonwebtoken");

function generateToken(User) {
  const userInfo = {
    _id: User.id,
    name: User.name,
    email: User.email,
  };

  const token = jwt.sign(userInfo, "JWT_SECRET");

  return token;
}

exports.generateToken = generateToken;

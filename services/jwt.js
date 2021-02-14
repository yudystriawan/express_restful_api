const jwt = require("jsonwebtoken");
const config = require("config");

function generateToken(User) {
  const userInfo = {
    _id: User.id,
    name: User.name,
    email: User.email,
  };

  const token = jwt.sign(userInfo, config.get('jwtSecretKey'));

  return token;
}

exports.generateToken = generateToken;

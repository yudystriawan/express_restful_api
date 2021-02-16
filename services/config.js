const config = require("config");

module.exports = function () {
  if (!config.get("jwtSecretKey")) {
    throw new Error('jwt secret key is not defined');
  }
};

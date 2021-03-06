const logger = require("../services/winston");

module.exports = function (err, req, res, next) {
  logger.error(err.message, { metadata: err.stack });

  res.status(500).json({
    message: "Something went wrong",
  });
};

const winston = require("winston");
require("winston-mongodb");
const { format } = require("winston");
const { combine, timestamp, prettyPrint } = format;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "winston-service" },
  transports: [
    new winston.transports.Console({
      format: combine(timestamp(), prettyPrint()),
    }),
    new winston.transports.File({ filename: "error.log" }),
    new winston.transports.MongoDB({
      db:
        "mongodb+srv://dbUser:password1234@restful.tp8d8.mongodb.net/dbUser?retryWrites=true&w=majority",
      level: "info",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
  handleExceptions: true,
});

module.exports = logger;

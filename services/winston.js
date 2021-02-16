const winston = require("winston");
const { format } = require("winston");
const { combine, timestamp, prettyPrint, colorize } = format;
require("winston-mongodb");
require("express-async-errors");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "winston-service" },
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), prettyPrint()),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
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

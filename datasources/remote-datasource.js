const logger = require("../services/winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(
      "mongodb+srv://dbUser:password1234@restful.tp8d8.mongodb.net/dbUser?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    )
    .then(() => logger.info("Connected to db..."));
};

require("express-async-errors");
const errorHandling = require("./middlewares/errorHandling");
const express = require("express");
const menus = require("./routes/menus");
const categories = require("./routes/categories");
const users = require("./routes/users");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");
const app = express();

process.on("unhandledRejection", (ex) => {
  throw ex;
});

if (!config.get("jwtSecretKey")) {
  console.log("FATAL ERROR: jwtSecretKey is no defined");
  process.exit(1);
}

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
  .then(() => console.log("Connected to db..."))
  .catch((err) => console.error("Could not connect to db...", err));

//Middleware
app.use(express.json());
app.use("/api/menus", menus);
app.use("/api/categories", categories);
app.use("/api/users", users);
app.use("/api/auth", auth);
//required last
app.use(errorHandling);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}...`));

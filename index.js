const express = require("express");
const menus = require("./routes/menus");
const categories = require("./routes/categories");
const users = require("./routes/users");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const app = express();

mongoose
  .connect("mongodb://127.0.0.1/market", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to db..."))
  .catch((err) => console.error("Could not connect to db...", err));

//Middleware
app.use(express.json());
app.use("/api/menus", menus);
app.use("/api/categories", categories);
app.use("/api/users", users); 
app.use("/api/auth", auth); 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}...`));

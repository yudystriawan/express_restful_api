const express = require("express");
const menus = require("./routes/menus");
const mongoose = require("mongoose");

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}...`));

const menus = require("./menus");
const categories = require("./categories");
const users = require("./users");
const auth = require("./auth");
const errorHandling = require("../middlewares/errorHandling");
const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/menus", menus);
  app.use("/api/categories", categories);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(errorHandling);
};

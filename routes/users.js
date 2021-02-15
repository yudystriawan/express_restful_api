const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const { hash } = require("../services/password-hasher");
const authentication = require("../middlewares/authentication");

router.get("/me", authentication, async (req, res) => {
  const user = await User.findById(req.user.id).select([
    "-password",
    "-verificationToken",
  ]);
  res.json(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).json({
      code: 400,
      message: error.details[0].message,
    });
  } else {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ message: "User already registered" });

    user = new User(_.pick(req.body, ["name", "email", "password"]));

    user.password = await hash(user.password);
    await user.save();
    res.json(_.pick(user, ["_id", "name", "email", "verified"]));
  }
});

module.exports = router;

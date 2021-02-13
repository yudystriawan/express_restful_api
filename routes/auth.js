const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { compare } = require("../services/password-hasher");
const { generateToken } = require("../services/jwt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
    });
  } else {
    const invalidAuth = "invalid email or password";

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: invalidAuth });

    const passwordMatched = await compare(req.body.password, user.password);
    if (!passwordMatched) return res.status(400).json({ message: invalidAuth });

    const token = generateToken(user);

    return res.json({ success: true, token: token });
  }
});

function validate(request) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: passwordComplexity(),
  });

  return schema.validate(request);
}

module.exports = router;

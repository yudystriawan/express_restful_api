const mongoose = require("mongoose");
const Joi = require("joi");
const { v4 } = require("uuid");
const passwordComplexity = require("joi-password-complexity");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: v4(),
    },
  })
);

function validateUser(User) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: passwordComplexity(),
  });

  return schema.validate(User);
}

exports.User = User;
exports.validate = validateUser;
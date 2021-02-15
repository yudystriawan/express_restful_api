const mongoose = require("mongoose");
const Joi = require("joi");
const { v4 } = require("uuid");
const passwordComplexity = require("joi-password-complexity");

const roles = {
  user: "USER",
  admin: "ADMIN",
  owner: "OWNER",
};

const userSchema = new mongoose.Schema({
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
  role: {
    type: String,
    default: roles.user,
  },
});

userSchema.methods.isVerified = function verifiedUser() {
  return this.verified == true;
};

const User = mongoose.model("User", userSchema);

function validateUser(User) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: passwordComplexity(),
  });

  return schema.validate(User);
}

exports.User = User;
exports.userRoles = roles;
exports.validate = validateUser;

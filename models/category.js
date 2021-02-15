const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });

  return schema.validate(category);
}

exports.Category = Category;
exports.validate = validateCategory;

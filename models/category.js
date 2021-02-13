const mongoose = require("mongoose");
const Joi = require("joi");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  })
);

function validateCategory(cateogory) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });

  return schema.validate(schema);
}

exports.Category = Category;
exports.validate = validateCategory;

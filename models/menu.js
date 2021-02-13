const mongoose = require("mongoose");
const Joi = require("joi");

const Menu = mongoose.model(
  "Menu",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  })
);

function validateMenu(menu) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
  });

  return schema.validate(menu);
}

exports.Menu = Menu;
exports.validate = validateMenu;
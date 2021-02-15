const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    price: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

function validateMenu(menu) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    categoryId: Joi.objectId().required(),
    price: Joi.number().required(),
  });

  return schema.validate(menu);
}

exports.Menu = Menu;
exports.validate = validateMenu;

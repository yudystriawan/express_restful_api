const { required } = require("joi");

const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).json({
      code: 404,
      message: error.details[0].message,
    });
  } else {
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    try {
      const result = await category.save();
      res.json(result);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
});

router.put("/:id", async (req, res) => {
  var attributes = {};

  if (req.body.name) attributes.name = req.body.name;
  if (req.body.description) attributes.description = req.body.description;

  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: attributes },
      { new: true }
    );

    res.json(category);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.remove({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

module.exports = router;

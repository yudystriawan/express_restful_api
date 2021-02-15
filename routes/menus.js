const express = require("express");
const router = express.Router();
const { Menu, validate } = require("../models/menu");
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  const menus = await Menu.find().populate("category");
  return res.json(menus);
});

router.get("/:id", async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.json(menu);
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
    const menu = new Menu({
      name: req.body.name,
      description: req.body.description,
      category: req.body.categoryId,
      price: req.body.price,
      owner: req.user.id,
    });

    const user = await User.findById(req.user.id);
    if (!user.isVerified()) {
      return res.status(400).json({
        message: "User must verified first",
      });
    }

    const result = await menu.save();
    res.json(result);
  }
});

router.put("/:id", async (req, res) => {
  var attributes = {};

  if (req.body.name) attributes.name = req.body.name;
  if (req.body.description) attributes.description = req.body.description;
  if (req.body.price) attributes.price = req.body.price;

  const menu = await Menu.findByIdAndUpdate(
    req.params.id,
    { $set: attributes },
    { new: true }
  );

  res.json(menu);
});

router.delete("/:id", async (req, res) => {
  const menu = await Menu.remove({ _id: req.params.id });
  res.json(menu);
});

module.exports = router;

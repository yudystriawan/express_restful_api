const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const { Category, validate } = require("../models/category");
const { User } = require("../models/user");
const authorization = require("../middlewares/authorization");
const { userRoles } = require("../models/user");

router.get("/", async (req, res) => {
  const categories = await Category.find().populate(
    "owner",
    "-password -__v -verificationToken"
  );
  return res.json(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json(category);
});

router.post(
  "/",
  [authentication, authorization(userRoles.owner)],
  async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
      res.status(400).json({
        code: 400,
        message: error.details[0].message,
      });
    } else {
      const category = new Category({
        name: req.body.name,
        description: req.body.description,
        owner: req.user.id,
      });

      const user = await User.findById(req.user.id);
      if (!user.isVerified()) {
        return res.status(400).json({
          message: "User must verified first",
        });
      }

      const result = await category.save();
      return res.json(result);
    }
  }
);

router.put(
  "/:id",
  [authentication, authorization(userRoles.owner)],
  async (req, res) => {
    var attributes = {};

    if (req.body.name) attributes.name = req.body.name;
    if (req.body.description) attributes.description = req.body.description;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: attributes },
      { new: true }
    );

    res.json(category);
  }
);

router.delete(
  "/:id",
  [authentication, authorization(userRoles.owner)],
  async (req, res) => {
    const category = await Category.remove({ _id: req.params.id });
    res.json(category);
  }
);

module.exports = router;

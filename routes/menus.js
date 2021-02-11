const express = require("express");
const Joi = require("joi");
const router = express.Router();

const menus = [
  {
    id: 1,
    name: "Bakso",
    description: "ini adalah menu",
    category: "Makanan",
    price: 20000,
  },
  {
    id: 2,
    name: "Teh",
    description: "ini adalah menu",
    category: "Minuman",
    price: 5000,
  },
  {
    id: 3,
    name: "Sate",
    description: "ini adalah menu",
    category: "Makanan",
    price: 24000,
  },
];

router.get("/", (req, res) => {
  res.json(menus);
});

router.get("/:id", (req, res) => {
  const menu = menus.find((element) => element.id === parseInt(req.params.id));
  if (!menu) {
    res.status(404).json({
      code: 404,
      message: `Menu with id ${req.params.id} not found`,
    });
  } else {
    res.json(menu);
  }
});

router.post("/", (req, res) => {
  const { error } = validateMenu(req.body);
  if (error) {
    res.status(400).json({
      code: 404,
      message: error.details[0].message,
    });
  } else {
    const menu = req.body;
    menu.id = menus.length + 1;
    menus.push(menu);
    res.status(201).json(menu);
  }
});

router.put("/:id", (req, res) => {
  const menu = menus.find((element) => element.id === parseInt(req.params.id));
  if (!menu) {
    res.status(404).json({
      code: 404,
      message: `Menu with id ${req.params.id} not found`,
    });
  } else {
    const newMenu = req.body;

    if (newMenu.name) menu.name = newMenu.name;
    if (newMenu.description) menu.description = newMenu.description;
    if (newMenu.category) menu.category = newMenu.category;
    if (newMenu.price) menu.price = newMenu.price;

    res.json(menu);
  }
});

router.delete("/:id", (req, res) => {
  const menu = menus.find((element) => element.id === parseInt(req.params.id));
  if (!menu) {
    res.status(404).json({
      code: 404,
      message: `Menu with id ${req.params.id} not found`,
    });
  } else {
    const index = menus.indexOf(menu);

    menus.splice(index, 1);

    res.json(menu);
  }
});

function validateMenu(menu) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
  });

  return schema.validate(menu);
}

module.exports = router;

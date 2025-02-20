const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../Controller/PanierController");
const router = express.Router();

router.route("/").get(getCart).post(addToCart);

router.route("/:id").delete(removeFromCart);

module.exports = router;

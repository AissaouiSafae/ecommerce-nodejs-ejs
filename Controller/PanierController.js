const CartItem = require("../Models/panier");
const Product = require("../Models/Product");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).render("error", { message: "Product not found" });
    }

    const cartItem = new CartItem({
      product: productId,
      quantity: quantity || 1,
    });

    await cartItem.save();
    res.redirect("/cart");
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("product");
    res.render("cart", { cartItems });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await CartItem.findByIdAndDelete(id);
    res.redirect("/cart");
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

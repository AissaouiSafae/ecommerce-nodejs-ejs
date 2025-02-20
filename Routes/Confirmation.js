const express = require("express");
const router = express.Router();

router.post("/confirmation", async (req, res) => {
  const { firstName, lastName, address, cardNumber } = req.body;

  if (!firstName || !lastName || !address || !cardNumber) {
    return res
      .status(400)
      .render("error", { message: "All fields are required." });
  }

  try {
    // Exemple : Calculer le montant total
    const cartItems = await CartItem.find().populate("product");
    const totalAmount =
      cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ) * 1.15;

    // Vider le panier après paiement (optionnel)
    await CartItem.deleteMany();

    // Rendre la page de confirmation
    res.render("confirmation", {
      firstName,
      lastName,
      address,
      totalAmount,
    });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
});

module.exports = router;

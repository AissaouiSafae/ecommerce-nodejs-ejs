const express = require("express");
const router = express.Router();
const CartItem = require("../Models/panier"); // Modèle pour le panier

// Afficher la page de paiement
router.get("/", async (req, res) => {
  try {
    // Récupérer les articles du panier
    const cartItems = await CartItem.find().populate("product");
    res.render("payment", { cartItems });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
});

// Traiter le paiement
router.post("/", async (req, res) => {
  const { firstName, lastName, address, cardNumber } = req.body;

  if (!firstName || !lastName || !address || !cardNumber) {
    return res
      .status(400)
      .render("error", { message: "Tous les champs sont obligatoires." });
  }

  try {
    // Exemple de logique pour calculer le montant
    const cartItems = await CartItem.find().populate("product");
    const totalAmount =
      cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ) * 1.15;

    // Vider le panier après paiement
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

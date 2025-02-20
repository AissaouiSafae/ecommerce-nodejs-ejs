const express = require("express");
const {
  getAllproducts,
  getSingleProduct,
  addSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
} = require("../Controller/ProductController");
const router = express.Router();

const Product = require("../Models/Product");
const upload = require("../multer-config"); // Configuration de Multer

//const express = require('express');
// Importez votre configuration Multer
//const Product = require('../Models/Product');
//const upload = require('../path/to/multer/configuration');

router.route("/").get(getAllproducts);
// .post(addSingleProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  // .put(updateSingleProduct)
  .delete(deleteSingleProduct);

router.get("/detaille/:id", getSingleProduct);

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Vérifiez que le fichier a été uploadé
    if (!req.file) {
      return res.status(400).send("Image not uploaded!");
    }

    // Créez un nouvel objet produit
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: `/uploads/${req.file.filename}`, // Chemin relatif de l'image
    });

    // Sauvegardez le produit dans la base de données
    await newProduct.save();
    res.redirect("/products");
  } catch (error) {
    console.error("Error saving product:", error.message);
    res.status(500).send("An error occurred while saving the product.");
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    let updateData = { name, price, description };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    await Product.findByIdAndUpdate(id, updateData);
    res.redirect("/Products");
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
});

//console.log(req.file);

module.exports = router;

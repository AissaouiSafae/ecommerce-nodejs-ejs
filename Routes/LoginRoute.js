const express = require("express");
const { loginPage, loginUser } = require("../Controller/LoginController");
const router = express.Router();

router.get("/", loginPage); // Affiche la page de connexion
router.post("/", loginUser); // Traite la soumission du formulaire

module.exports = router;

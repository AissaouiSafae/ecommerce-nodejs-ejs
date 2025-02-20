const express = require("express");
const router = express.Router();

router.get("/admin", async (req, res) => {
  try {
    const admin = await AdminModel.findOne({ role: "admin" }); // Exemple avec Mongoose
    res.render("Admin", { admin });
  } catch (error) {
    console.error(error);
    res.render("Admin", { admin: null });
  }
});

module.exports = router;

const Admin = require("../Models/Admin");
//const bcrypt = require('bcrypt');

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.render("login", { error: "Invalid email or password" });
    }

    const isMatch = await Admin.findOne({ password });
    if (!isMatch) {
      return res.render("login", { error: "Invalid email or password" });
    }

    req.session.user = admin;

    return res.redirect("/Users");
  } catch (error) {
    console.error("Login error:", error.message);
    return res.render("login", {
      error: "An error occurred. Please try again.",
    });
  }
};

const User = require("../Models/User");

exports.getAllusers = async (req, res) => {
  try {
    const users = await User.find();

    res.render("Users", { users });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render("User", user);
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

exports.addSingleUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect("/Users");
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

exports.updateSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body);
    res.redirect("/Users");
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

exports.deleteSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect("/Users");
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

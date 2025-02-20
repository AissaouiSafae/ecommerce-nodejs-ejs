const Admin = require("../Models/Admin");

exports.getSingleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).render("error", { message: "Admin not found" });
    }

    res.render("Admin", { admin });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

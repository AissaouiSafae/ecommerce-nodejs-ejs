const express = require("express");
const {
  getAllusers,
  getSingleUser,
  addSingleUser,
  updateSingleUser,
  deleteSingleUser,
} = require("../Controller/UserController");
const router = express.Router();

router.route("/").get(getAllusers).post(addSingleUser);

router
  .route("/:id")
  .get(getSingleUser)
  .put(updateSingleUser)
  .delete(deleteSingleUser);

module.exports = router;

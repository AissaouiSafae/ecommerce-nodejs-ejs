const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter the name"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the price"],
  },
  description: {
    type: String,
    required: [true, "Please enter the description"],
  },
  image: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

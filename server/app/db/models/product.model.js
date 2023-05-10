const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  desc: { type: String, required: true, minlength: 3, maxlength: 100 },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

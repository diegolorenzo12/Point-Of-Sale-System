const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  imageUrl: String,
  stock: Number,
  Brand: String,
});

const Products = mongoose.model("Products", productsSchema);
module.exports = Products;

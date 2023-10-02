const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  stock: Number,
  Brand: String,
  imageUrl: String,
  imageName: String,
});

const Products = mongoose.model("Product", productsSchema);
module.exports = Products;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  Brand: String,
});

const Products = mongoose.model("User", productsSchema);
module.exports = Products;

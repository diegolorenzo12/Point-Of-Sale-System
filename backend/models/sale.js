const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  employeeId: String,
  items: [saleItemSchema],
  Date: Date,
});

const Sale = mongoose.model("Sale", saleSchema);
module.exports = Sale;

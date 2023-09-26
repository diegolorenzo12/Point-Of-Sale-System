const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = saleItemSchema;

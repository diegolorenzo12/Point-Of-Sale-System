const express = require("express");
const router = express.Router();
const Sale = require("../models/sale");
const Product = require("../models/products");
const saleItemSchema = require("../models/saleItem");

router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find().populate("items.product");
    res.json(sales);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch sales" });
  }
});

router.post("/", async (req, res) => {
  try {
    // Extract data from the request body
    const employeeId = req.body.employeeId;
    const items = req.body.items;
    // Create an array to store sale items
    const saleItems = [];

    // validar que todos los productos existan
    for (const item of items) {
      const { product: productId, quantity } = item;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(400).json({ error: "Some products not found" });
      }

      // Validate if the product has enough stock for the sale
      if (product.stock < quantity) {
        return res
          .status(400)
          .json({ error: "Insufficient stock for the product" });
      }

      // Create a sale item and add it to the saleItems array
      const saleItem = {
        product: productId,
        quantity: quantity,
      };
      saleItems.push(saleItem);

      // Deduct the sold quantity from the product's stock
      product.stock -= quantity;
      await product.save();
    }

    // Create a new sale with the saleItems array
    const newSale = new Sale({
      employeeId: employeeId,
      items: saleItems,
      Date: new Date(),
    });

    // Save the new sale to the database
    await newSale.save();

    // Respond with the created sale
    res.status(201).json(newSale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create sale" });
  }
});

module.exports = router;

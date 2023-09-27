const express = require("express");
const router = express.Router();
const Sale = require("../models/sale");

router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find().populate("items.product");
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sales" });
  }
});

router.post("/", (req, res) => {
  //users logic
  res.send({ data: "some data" });
});

router.patch("/", (req, res) => {
  //users logic
  res.send({ data: "some data" });
});

router.delete("/", (req, res) => {
  //users logic
  res.send({ data: "some data" });
});

module.exports = router;

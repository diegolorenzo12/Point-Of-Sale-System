const express = require("express");
const router = express.Router();
const Products = require("../models/products");

router.get("/", (req, res) => {
  //products logic
  res.send({ data: "some data" });
});

router.post("/", (req, res) => {
  //products logic
  res.send({ data: "some data" });
});

router.patch("/", (req, res) => {
  //products logic
  res.send({ data: "some data" });
});

router.delete("/", (req, res) => {
  //products logic
  res.send({ data: "some data" });
});

module.exports = router;

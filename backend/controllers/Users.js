const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.get("/", (req, res) => {
  //users logic
  res.send({ data: "some data" });
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

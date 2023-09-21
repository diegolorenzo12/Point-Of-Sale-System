const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/users");
//const router = express.Router();
const app = express();
const port = 3000;

const db = process.env.ATLAS_URI;
mongoose.connect(db, { useNewUrlParser: true });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

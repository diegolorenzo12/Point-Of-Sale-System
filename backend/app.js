const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const db = process.env.ATLAS_URI;
mongoose.connect(db, { useNewUrlParser: true });

const userRoute = require("./controllers/Users");

app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

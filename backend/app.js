const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//Import controllers
const userRoute = require("./controllers/Users");
const productRoute = require("./controllers/Products");
const saleRoute = require("./controllers/Sale");
const authRoute = require("./controllers/Auth");

const app = express();
const port = 3001;

//Connect to DB
const db = process.env.ATLAS_URI;
mongoose.connect(db, { useNewUrlParser: true });

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/sales", saleRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

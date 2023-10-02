const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/authMiddleware");
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

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/user", authMiddleware(), userRoute);
app.use("/api/products", authMiddleware(), productRoute);
app.use("/api/sales", saleRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

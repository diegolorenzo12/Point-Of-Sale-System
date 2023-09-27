const express = require("express");
const router = express.Router();
const Products = require("../models/products");
const multer = require("multer");
const containerClient = require("../containerClient");
const { v4: uuidv4 } = require("uuid");
const util = require("../util");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = new RegExp(req.query.category, "i"); //regex i for case insensitive
    }
    if (req.query.description) {
      query.description = new RegExp(req.query.description, "i"); //regex i for case insensitive
    }
    if (req.query.name) {
      query.description = new RegExp(req.query.name, "i"); //regex i for case insensitive
    }
    const products = await Products.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const products = await Products.findById(req.params.id);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, description, brand, stock } = req.body;

    if (
      !name ||
      !price ||
      !category ||
      !description ||
      !brand ||
      !stock ||
      !req.file
    ) {
      return res.status(400).json({ error: "Provide all parameters" });
    }

    //upload to azure blob storage
    const blobName = `${Date.now()}-${uuidv4()}-${req.file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadResponse = await blockBlobClient.upload(
      req.file.buffer,
      req.file.buffer.length
    );

    //check is upload succesfull
    if (!uploadResponse.requestId && uploadResponse.error) {
      console.error("Error uploading file:", uploadResponse);
      return res.status(400).json({ error: "Connection error" });
    }
    const imageUrl = blockBlobClient.url;

    // Create a new product
    const newProduct = new Products({
      name: name,
      price: price,
      imageUrl: imageUrl,
      imageName: blobName,
      category: category,
      description: description,
      stock: stock,
      Brand: brand,
    });

    // Save the product to the database
    await newProduct.save();

    // Respond with the created product
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

//update by json body
router.patch("/:id", async (req, res) => {
  try {
    const updateParams = req.body;
    if (!updateParams) {
      return res
        .status(400)
        .json({
          error: "Provide a json with params to update in query params",
        });
    }
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      { $set: updateParams },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send({
      message: "Error changing stock of product",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Fetch the product from the database
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Delete the image from Azure Blob Storage
    const blobName = product.imageName; // Assuming the product has an imageName field storing the blob name
    await util.deleteBlobFromAzure(blobName);
    // Delete the product from the database
    await Products.findByIdAndDelete(req.params.id);

    res.status(200).send({ message: "Product and image deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error deleting product", error: error.message });
  }
});

module.exports = router;

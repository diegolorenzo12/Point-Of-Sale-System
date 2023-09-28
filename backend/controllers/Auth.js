const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/users");

router.post("/login", async (req, res) => {});

router.post("/signup", async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res
        .status(400)
        .json({ error: "Missing name, email or passsword" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this name already exists" });
    }

    // Generate a salt for password hashing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = new User({
      name,
      password: hashedPassword, // Store the hashed password
      accessLevel: 1, // You can set the accessLevel to a default value
      salt: salt,
      email: email,
    });

    // Save the user to the database
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h", // Adjust the expiration time as needed
      }
    );
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

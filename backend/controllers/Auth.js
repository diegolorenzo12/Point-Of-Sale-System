const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/users");

router.post("/login", async (req, res) => {
  try {
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;

    // Find the user by name
    if (!password) {
      return res.status(400).json({ error: "Missing passsword" });
    }
    var user;
    if (name) {
      user = await User.findOne({ name });
    } else if (email) {
      user = await User.findOne({ email });
    } else {
      return res.status(400).json({ error: "Missing name or email" });
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Authentication successful", token, name: user.name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      password: hashedPassword,
      accessLevel: 1,
      salt: salt,
      email: email,
    });

    // Save the user to the database
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res
      .status(201)
      .json({ message: "User created successfully", token, name: user.name });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

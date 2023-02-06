'use strict';

const express = require('express');
const User = require('../../models/User');
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/login", (req, res) => {
    const {username, email, password } = req.body;
    
    // Search for a user with the specified email
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found with that email",
        });
      }
  
      // Compare passwords
      bcrypt.compare(password, user.password, username, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).json({
            error: "Invalid password",
          });
        }
  
        res.json({ message: "Login successful" });
      });
    });
  });
  
  module.exports = router;
  
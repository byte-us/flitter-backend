"use strict";

const express = require("express");
const User = require("../../models/User");
const Token = require("../../models/Token");
const router = express.Router();
const passport = require("passport");

const crypto = require("crypto");


// GET /register
router.get("/register", (req, res, next) => {
  res.render("register");
});

const jwt = require("jsonwebtoken")


// POST /register
router.post("/register", async function (req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).send({error: "Missing username or password or email"});
  }
  const existingEmail = await User.findOne({ email: req.body.email });
  const existingUsername = await User.findOne({ username: req.body.username });

  if (existingEmail || existingUsername) {
    return res.status(403).send({error: "Account already exists with email or username"});
  }

  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  await user.save();
  return res.send({message: "Successfully registered"});

});


router.post(
  "/login",
  passport.authenticate("local", {
    session: false,
  })
);
router.post("/login", async function (req, res, next) {
  if (!req.user) {
    return res.status(400).json({
      message: "Login failed"
    });
  };
  const newToken = new Token({
    userId: req.user.id
  })
  const savedToken = await newToken.save();
  const token = jwt.sign(savedToken.getJWT(), 'your_jwt_secret');
  return res.json({token});
});

router.post('/logout', passport.authenticate('jwt', {session: false}));
router.post('/logout', (req, res, next) => {
  Token.deleteMany({
    userId: req.user.id
  }).then(() => {
    res.send({message: "Successfully invalidated Tokens for user"})
  }).catch(()=>{
    next();
  });
});




module.exports = router;

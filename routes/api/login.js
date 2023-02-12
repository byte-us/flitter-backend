"use strict";

const express = require("express");
const User = require("../../models/User");
const { Router } = require("express");
const router = express.Router();
const passport = require("passport");
const crypto = require("crypto");

// GET /register
router.get("/register", (req, res, next) => {
  res.render("register");
});

// POST /register
router.post("/register", function (req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      if (err) {
        return next(err);
      }

      const existingEmail = await User.findOne({ email: req.body.email });
      const existingUsername = await User.findOne({
        username: req.body.username,
      });

      if (existingEmail || existingUsername) {
        return res.status(403).send({error: "Account already exists with email or username"});
      }

      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword.toString("hex"),
        salt: salt.toString("hex"),
      });
      await user.save();

      req.login({ id: user.id, username: req.body.username }, function (err) {
        if (err) {
          return next(err);
        }
        res.send();
      });
    }
  );
});

// GET /login
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/api/login/success",
    failureRedirect: "/api/login/failure",
  })
);

router.get("/login/success", function (req, res) {
  res.send();
});

router.get("/login/failure", function (req, res) {
  res.status(401).json({ error: "Failed to log in" });
});

// POST /login
router.post("/login", function (req, res, next) {
  res.send();
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

/*
function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
*/

module.exports = router;

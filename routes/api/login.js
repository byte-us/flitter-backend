'use strict';

const express = require('express');
const User = require('../../models/User');
const { Router } = require('express');
const router = express.Router();
const passport = require('passport')


// GET /register
router.get('/register', (req, res, next) => {
  res.render('register');

})

// POST /register
router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/',
  failureRedirect: '/register',
  passReqToCallback: true
})) 

// GET /login
router.get('/login', (req, res, next) => {
  res.render('login')
});

// POST /login
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  passReqToCallback: true
}));


router.get('/logout', (req, res, send) => {
  req.logOut();
  res.redirect('/login');
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
  
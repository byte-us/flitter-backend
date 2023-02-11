'use strict';

const express = require('express');
const User = require('../../models/User');
const { Router } = require('express');
const router = express.Router();
const passport = require('passport')


router.get('/', (req, res, next) => {
  res.render('index');
});


// GET /signup
router.get('/signup', (req, res, next) => {
  res.render('signup');
})


// POST /signup    
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  passReqToCallback: true
})) 

// GET /login
router.get('/login', (req, res, next) => {
  res.render('login');
});

// POST /login
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login', 
  passReqToCallback: true
}));


/*
router.get('/',isAuthenticated, (req, res, next) => {
  res.render('index');
});
*/


/*
router.get('/logout', (req, res, send) => {
  req.logOut();
  res.redirect('/login');
});

*/
function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}



  module.exports = router;
  
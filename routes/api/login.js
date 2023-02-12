'use strict';

const express = require('express');
const User = require('../../models/User');
const { Router } = require('express');
const router = express.Router();
const passport = require('passport')
const nodemailer = require('nodemailer');

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


/* send email to reset password */
router.post('/resetpass',async (req, res, next) => {
  // const email = await User.findOne(req.body.email)
  console.log(req.body)
  try {
    // const email = req.body.email

  // if(email) {
    const emailContent = {
      to: `${req.body.email}`,
      subject: 'Reset your Flitter password',
      html: `Hi ${req.body.name}, <br> Click the following link to reset yout password: <br>
      http://localhost:3000/reset-password`
    }
    // const transport = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS
    //   }
    // })
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6dda7148a9b54a",
        pass: "14df1d0daa21ad"
      }
    });
    await transport.sendMail(emailContent)
    res.json({Message: 'message sent'})
  // }
  } catch (error) {
    next(error)
  }

})

module.exports = router;
  

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User')

//serialize user to save signup
passport.serializeUser((user, done) => {
    done(null, user.id)
});

//authenticate the id in the browser
passport.deserializeUser( async(id, done) => {
    const user = await User.findById(id)
    done(null, user)
});


// receive registration and validate it
passport.use('local-signup', new localStrategy({
  nameField: 'name',
  usernameField: 'username',
  emailField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, name, username, email, password, done) => {
  const user = await User.findOne({'name': name},{'username': username},{'email': email})
  console.log(user)
  if(user) {
    return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
  } else {
    const newUser = new User();
    newUser.name = name;
    newUser.username = username;
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    console.log(newUser)
    await newUser.save();
    done(null, newUser);
  }
}));




passport.use('local-login', new localStrategy({
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user) {
      return done(null, false, req.flash('loginMessage', 'No User Found'));
    }
    if(!user.comparePassword(password)) {
      return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
    }
    return done(null, user);
  }));




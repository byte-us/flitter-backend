const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const User = require("../models/User");
const Token = require("../models/Token");
const crypto = require("crypto");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use("local",  new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
}, async (email, password, done) => {
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    return done(null, false, {message: 'Incorrect email or password.'});
  }
  done(null, user, {message: 'Logged In Successfully'})
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : 'your_jwt_secret'
},
function (jwtPayload, cb) {
  console.log(jwtPayload)
  Token.findById(jwtPayload._id)
      .then(token => {
          console.log(token);
          if(!token) {
              return cb(null, false, {message:'Invalid Token'});
          }
          //find the user in db if needed
          User.findById(jwtPayload.userId)
              .then(user => {
                  return cb(null, user);
              })
              .catch(err => {
                  return cb(err);
              });    })
      .catch(err => {
          return cb(err);
      });
}));

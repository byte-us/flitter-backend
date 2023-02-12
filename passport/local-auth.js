const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const crypto = require("crypto");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

console.log("register local strategy");
passport.use(
  // Passport specifically expects a "username" parameter, which means we need to
  // send the email as the username. This is not the same as our username.
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return cb(null, false, { message: "Incorrect username or password." });
      }
      crypto.pbkdf2(
        password,
        Buffer.from(user.salt, "hex"),
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (err) {
            console.error(err);
            return cb(err);
          }
          if (
            !crypto.timingSafeEqual(
              Buffer.from(user.password, "hex"),
              hashedPassword
            )
          ) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }
          return cb(null, user);
        }
      );
    } catch (err) {
      console.error(err);
      cb(err);
    }
  })
);

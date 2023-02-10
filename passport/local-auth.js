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
    usernameField: 'username',
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback: true
} , async (req, email, username, password, done) => {

    const user = await User.findOne({ email: email }, { username: username})
    if (user) {
        return done(null, false, req.flash('signupMessage', 'The email or username is already taken'))
    } else {
        const newUser = newUser();
        newUser.username = username;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password); 
    }
    
    //save the new user
    await newUser.save(function(err, user) {
        if (err) return console.error(err);
        console.log('User' + user.username + 'create')
    })

    /*
    await newUser.save();
    done(null, newUser);
    */

}))



passport.use('local-login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

 
}, async (req, email, password, done) => {
    User.findOne({ email: email })
    if (!user) {
        return done(null, false, req.flash('loginMessage', 'No username or email found'))
    } if (user.comparePassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Incorrect Password'))
    }
    done(null, user)
}));



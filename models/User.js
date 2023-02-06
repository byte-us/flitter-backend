'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
    id: { type: Number, unique: true},
    name: { type: String, require: true, unique: false},
    username: { type: String, unique: true, require: true},
    email: { type: String, unique: true },
    password: { type: String, require: true, unique: false },
    followers: [{
            type: 'ObjectId',
            ref: 'User'
          }],
    following: [{
        type: 'ObjectId',
        ref: 'User'
      }],
    content: [
      {
        type: 'ObjectId',
        ref: 'Content'
      }
    ]
}, { timestamps: true });


//function to save the password
userSchema.pre('save', function(next) {
  if(this.isNew || this.isModified('password')) {
    const document = this;

    bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
      if(err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    })
  } else {
    next();
  }
});

//verification password correct
userSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same){
    if(err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;
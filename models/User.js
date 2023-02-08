'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;

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


userSchema.methods.encryptPassword = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//verification password correct
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
 };
 

const User = mongoose.model('User', userSchema);

module.exports = User;
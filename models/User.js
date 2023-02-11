'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({

    name: { type: String, require: true },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, require: true },

    followers: [{
            type: 'ObjectId',
            ref: 'User',
            require: false
          }],
    following: [{
        type: 'ObjectId',
        ref: 'User',
        require: false
      }],
    posts: [
      {
        type: 'ObjectId',
        ref: 'Post',
        require: false
      }
    ]
}, { timestamps: true });


//encrypt password
userSchema.methods.encryptPassword = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//verification password correct
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
 };


userSchema.statics.getUsers = function(filter) {
  const query = User.find({filter})
  query.followers = User.findById(User._id)
  query.following = User.findById(User._id)
  query.populate('followers','username')
  query.populate('following','username')
  return query.exec()
}


const User = mongoose.model('User', userSchema);

module.exports = User;
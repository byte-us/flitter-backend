'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({

    name: { type: String, require: true },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, require: true },
    salt: { type: String, require: true },

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


userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

userSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password)
  return compare
}


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
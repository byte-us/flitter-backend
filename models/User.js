'use strict'

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    followers: [{
            type: 'ObjectId',
            ref: 'User'
          }],
    following: [{
        type: 'ObjectId',
        ref: 'User'
      }],
    posts: [
      {
        type: 'ObjectId',
        ref: 'Post'
      }
    ]
}, { timestamps: true });


userSchema.statics.getUsers = function(filter) {
  const query = User.find({filter})
  return query.exec()
}


const User = mongoose.model('User', userSchema);

module.exports = User;
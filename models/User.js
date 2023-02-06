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
        ref: 'Posts'
      }
    ]
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
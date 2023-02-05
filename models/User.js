'use strict'

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: 'ObjectId', unique: true},
    name: { type: String, require: true, unique: false},
    username: { type: String, unique: true, require: false},
    email: { type: String, unique: true },
    password: { type: String, unique: true },
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


const User = mongoose.model('User', userSchema);

module.exports = User;
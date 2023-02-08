'use strict'

const mongoose = require('mongoose');
const User = require('./User')


const postSchema = mongoose.Schema({
    author: {
        type: 'ObjectId',
        ref: 'User',
        required: true
      },
    message: { type: String, require: true, min: 1, max: 140 },
    image: { type: String },
    time: { type: Date, default: Date.now },
    kudos: [
        {
          type: 'ObjectId',
          ref: 'User',
        }
      ]

}, { timestamps: true });


postSchema.statics.getPosts = function(skip, limit, sort) {
  const query = Post.find()
  query.populate('author','username')
  query.populate('kudos', 'username')
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  return query.exec()
}



const Post = mongoose.model('Post', postSchema);

module.exports = Post;


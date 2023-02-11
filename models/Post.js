'use strict'

const mongoose = require('mongoose');
const { populate } = require('./User');
const User = require('./User')


const postSchema = mongoose.Schema({
    author: {
        type: 'ObjectId',
        ref: 'User',
        required: true,
        index: true
      },
    message: { type: String, require: true, min: 1, max: 140 },
    image: { type: String },
    kudos: [
        {
          type: 'ObjectId',
          ref: 'User',
        }
      ],
      publishedDate: {type: Date, default: Date.now}

}, { timestamps: true });

postSchema.index({message: 'text'})


postSchema.statics.getPosts = function(filter, sort, skip, limit) {
  const query = Post.find(filter);
  query.populate('author', 'username');
  query.populate('kudos', 'username');
  query.sort(sort);
  query.skip(skip);
  query.limit(limit);
  return query.exec();
}



const Post = mongoose.model('Post', postSchema);

module.exports = Post;


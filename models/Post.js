'use strict'

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    publisherId: { type: Number, unique: true },
    author: {
        type: 'ObjectId',
        ref: 'User',
        required: true
      },
    message: { type: String, require: true, min: 1, max: 140 },
    image: { type: String },
    publishDate: { type: Date },
    timestamp: { type: String },
    kudos: [
        {
          type: 'ObjectId',
          ref: 'User',
        }
      ]

}, { timestamps: true });

postSchema.statics.getPosts = function(filter) {
  const query = Post.find({filter})
  return query.exec()
}


const Post = mongoose.model('Post', postSchema);

module.exports = Post
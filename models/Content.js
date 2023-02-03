'use strict'

const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
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

const Content = mongoose.model('Content', contentSchema);

module.exports = Content
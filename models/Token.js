'use strict'

const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    id: { type: Number},
    userId: {type: String },
    expiryDate: { type: date }
}, { timestamps: true })

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
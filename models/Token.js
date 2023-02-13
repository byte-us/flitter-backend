'use strict'

const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    id: { type: Number},
    userId: {type: String },
    expiryDate: { type: Date }
}, { timestamps: true })

tokenSchema.methods.getJWT = function() {
    return this.toObject();
}

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
const { object, number } = require('joi');
var mongoose = require('mongoose');

var OrderRating = new mongoose.Schema({
    orderId: { type: String, required: false},
    totalRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0},
    },
{ timestamps: true }
);
module.exports = mongoose.model('orderrating', OrderRating);
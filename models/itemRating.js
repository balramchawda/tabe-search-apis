const { object, number } = require('joi');
var mongoose = require('mongoose');

var ItemRating = new mongoose.Schema({
    itemId: { type: String, required: false},
    totalRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0},
    },
{ timestamps: true }
);
module.exports = mongoose.model('itemrating', ItemRating);
const { object, number } = require('joi');
var mongoose = require('mongoose');

var FulfillmentRating = new mongoose.Schema({
    fulfillmentId: { type: String, required: false},
    totalRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0},
    },
{ timestamps: true }
);
module.exports = mongoose.model('fulfillmentrating', FulfillmentRating);
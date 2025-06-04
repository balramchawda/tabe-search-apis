var mongoose = require('mongoose');

var fnbUserRating = new mongoose.Schema({
    userId: { type: String, required: false},
    orderId: { type: String, required: false},
    id: { type: String, required: true },
    ratingValue: { type: Number, default: 0 },
    category: { type: String, default: 0},
    },
{ timestamps: true }
);
module.exports = mongoose.model('fnb-userrating', fnbUserRating);
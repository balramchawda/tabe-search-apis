var mongoose = require("mongoose");

var fnbProviderRating = new mongoose.Schema({
    userId: { type: String, required: false},
    userName: { type: String, required: false},
    totalRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0},
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("fnb-providerrating", fnbProviderRating);

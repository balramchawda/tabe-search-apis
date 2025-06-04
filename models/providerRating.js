var mongoose = require("mongoose");
const Constant = require("../Constants");

var providerRating = new mongoose.Schema({
    userId: { type: String, required: false},
    userName: { type: String, required: false},
    totalRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0},
  },
  { timestamps: true, strict: false }
);
// plugins
// userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("providerrating", providerRating);

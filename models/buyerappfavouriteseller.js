const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "buyerappseller", required: true },
    isFavorite: { type: Boolean, default: true },
    providerId: { type: String},
  },
  { timestamps: true }
);
module.exports = mongoose.model("buyerappfavouriteseller", schema);
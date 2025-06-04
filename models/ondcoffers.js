const mongoose = require("mongoose");

const OndcOrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    offerId: { type: String }, // Eg.FLAT50
    offerType: {
      type: String,
      enums: ["disc_pct", "disc_amt", "buyXgetY", "freebie"],
    },
    kikoOffer: { type: Boolean, default: false },
    status: { type: String, enums: ["active", "inactive"] },
    verified: { type: Boolean, default: false },
    applicability: {
      items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Catalogue" }],
    },
    description: { type: String },
    offerQualifiers: {
      minValue: { type: Number },
    },
    offerBenefit: {
      value: { type: Number },
      valueType: { type: String },
      valueCap: { type: Number },
    },
    images: { type: Array },
    expiry_date: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ondcoffers", OndcOrderSchema);

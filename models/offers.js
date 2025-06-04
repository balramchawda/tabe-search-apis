var mongoose = require('mongoose');
const Schema = mongoose.Schema
var OndcOffersSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  offerId: { type: String },
  offerType: { type: String, enums: ["disc_pct", "disc_amt", "buyXgetY", "freebie"] },
  kikoOffer: { type: Boolean, default: false },
  status: { type: String, enums: ["active", "inactive","pending"] },
  verified: { type: Boolean, default: false },
  applicability: {
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Catalogue' }],
  },
  description: { type: String },
  offerQualifiers: {
    minValue: { type: Number }
  },
  offerBenefit: {
    value: { type: Number },
    valueType: { type: String },
    valueCap: { type: Number },
  },
  applicableForAll: { type: Boolean, default: false },
  images: { type: Array },
  expiry_date: { type: String, default: '' }
});

module.exports = mongoose.model('OndcOffers', OndcOffersSchema);
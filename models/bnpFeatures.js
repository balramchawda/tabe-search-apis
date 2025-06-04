var mongoose = require('mongoose');
var ondcBnpFeaturesSchema = new mongoose.Schema({
  bap_id: { type: String, required: true, unique: true }, // Unique identifier for each BNP
  transactionId: { type: String },
  featuresList: { type: Array, default: [] },
},{ timestamps: true });
module.exports = mongoose.model('ondcBnpFeatures', ondcBnpFeaturesSchema);

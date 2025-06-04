var mongoose = require('mongoose');
var petPoojaRequestSchema = new mongoose.Schema({
  transactionId: { type: String },
  action: { type: String },
  reqBody: { type: Object, default: {} },
  response: { type: Object },
},
{ timestamps: true }
);
module.exports = mongoose.model('petPoojaRequest', petPoojaRequestSchema);
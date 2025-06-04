var mongoose = require('mongoose');
var ondcRequestSchema = new mongoose.Schema({
  transactionId: { type: String },
  action: { type: String },
  reqBody: { type: Object, default: {} },
  response: { type: Object },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('ondcRequest', ondcRequestSchema);
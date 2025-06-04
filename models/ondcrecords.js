var mongoose = require('mongoose');
var ondcRecordsSchema = new mongoose.Schema({
  userId:String,
  transaction_id:String,
  reqBody:Object,
  responseBody:Object,
  createdAt:{ type: Date, default: Date.now },
  updatedAt:{ type: Date, default: Date.now },
});
module.exports = mongoose.model('ondcrecords', ondcRecordsSchema);
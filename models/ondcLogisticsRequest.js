var mongoose = require('mongoose');
var ondcLogisticsRequestSchema = new mongoose.Schema({
    transactionId: { type: String },
    ondcOrderId: { type: String },
    action: { type: String },
    type: { type: String },
    reqBody: { type: Object, default: {} },
    response: { type: Object },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('ondcLogisticsRequest', ondcLogisticsRequestSchema);
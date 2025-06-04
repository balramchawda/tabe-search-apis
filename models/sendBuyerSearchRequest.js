var mongoose = require('mongoose');
var sendBuyerSearchRequestSchema = new mongoose.Schema({
    transactionId: { type: String, index: true },
    action: { type: String },
    messageId: { type: String },
    domain: {type: String},
}
    ,
    {
        timestamps: true    // Adds createdAt and updatedAt fields, and auto-updates updatedAt
    });
module.exports = mongoose.model('sendBuyerSearchRequest', sendBuyerSearchRequestSchema);
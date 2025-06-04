var mongoose = require('mongoose');
var buyerOndcOnSearchRequestSchema = new mongoose.Schema({
    transactionId: { type: String, },
    action: { type: String },
    sellerNp: { type: String },
    providerId: { type: String },
    reqBody: { type: Object, default: {} },
    response: { type: Object, default: {} },
    status: { type: String },
}
    ,
    {
        timestamps: true    // Adds createdAt and updatedAt fields, and auto-updates updatedAt
    });
module.exports = mongoose.model('buyerOndcOnSearchRequest', buyerOndcOnSearchRequestSchema);
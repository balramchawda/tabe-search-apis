var mongoose = require('mongoose');
var buyerOndcOnSearchFullRequestSchema = new mongoose.Schema({
    transactionId: { type: String, },
    action: { type: String },
    providerId: { type: String },
    sellerNp: { type: String },
    providerData: { type: Object, default: {} },
}
    ,
    {
        timestamps: true    // Adds createdAt and updatedAt fields, and auto-updates updatedAt
    });
module.exports = mongoose.model('buyerOndcOnSearchFullRequest', buyerOndcOnSearchFullRequestSchema);
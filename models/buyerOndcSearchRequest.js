var mongoose = require('mongoose');
var buyerOndcSearchRequestSchema = new mongoose.Schema({
    transactionId: { type: String, index: true },
    action: { type: String },
    city: { type: String },
    reqBody: { type: Object, default: {} },
    isIncremental: { type: Boolean, default: false },
    type: { type: String },
    incrementalType: { type: String },
    response: { type: Object, default: {} },
}
    ,
    {
        timestamps: true    // Adds createdAt and updatedAt fields, and auto-updates updatedAt
    });
module.exports = mongoose.model('buyerondcSearchRequest', buyerOndcSearchRequestSchema);
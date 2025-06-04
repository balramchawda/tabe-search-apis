var mongoose = require('mongoose');
var buyerOndcRequestSchema = new mongoose.Schema({
    transaction_id: { type: String },
    action: { type: String },
    reqBody: { type: Object },
    response: { type: Object },
    status: { type: String },
    error: { type: Array },
    landingSource: { type: String, default: "" }
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
},
    { timestamps: true, versionKey: false });
module.exports = mongoose.model('buyerOndcRequest', buyerOndcRequestSchema);
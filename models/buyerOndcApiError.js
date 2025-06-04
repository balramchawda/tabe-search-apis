var mongoose = require('mongoose');
var buyerOndcApiErrorSchema = new mongoose.Schema({
    transactionId: { type: String },
    ondcOrderId: { type: String },
    errorsData: { type: Array },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    landingSource: { type: String, default: "" }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('buyerOndcApiError', buyerOndcApiErrorSchema);
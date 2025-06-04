var mongoose = require('mongoose');
var buyerOndcApiRecordSchema = new mongoose.Schema({
    transactionId: { type: String },
    records: { type: Array },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
    {
        timestamps: true // This will add `createdAt` and `updatedAt` fields
    }
);
module.exports = mongoose.model('buyerOndcApiRecord', buyerOndcApiRecordSchema);
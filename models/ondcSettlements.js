const mongoose = require("mongoose");

const ondcSettlementsSchema = new mongoose.Schema({
    context: { type: Object },
    settlementData: { type: Object },
    rawObject: { type: Object },
    transaction_id: {type: String},
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'OndcOrder' },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
}, { timestamps: true });
module.exports = mongoose.model("OndcSettlements", ondcSettlementsSchema);
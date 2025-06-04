const mongoose = require("mongoose");

const rsfRequestsSchema = new mongoose.Schema({
     transactionId: { type: String, required: true },
    messageId: { type: String, required: true },
    requestType: {type: String, required: true},
    // orderCount: {type: Number, required: true, default: 0},
    // onSettleReceive: {type: Boolean, default: false},
}, { timestamps: true });
// rsfRequestsSchema.index({ requestType: 1 }, { unique: true });

module.exports = mongoose.model("rsf-requests", rsfRequestsSchema);
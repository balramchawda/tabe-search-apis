const mongoose = require("mongoose");

const buyerRsfRequestsSchema = new mongoose.Schema({
     transactionId: { type: String, required: true },
    messageId: { type: String, required: true },
    requestType: {type: String, required: true},
}, { timestamps: true });
// rsfRequestsSchema.index({ requestType: 1 }, { unique: true });

module.exports = mongoose.model("bnp-rsf-requests", buyerRsfRequestsSchema);
const mongoose = require("mongoose");

const buyerRsfSettleSchema = new mongoose.Schema({
    settlementData: { type: Object, required: true },
    receiverAppId: { type: String, required: true, unique: true },
    context: { type: Object, required: true },
    providerId: { type: String, required: true },
    settleOrderCount: { type: Number, required: true, default: 0 },
    onSettleOrderCount: { type: Number, required: true, default: 0 },
    onSettleReceive: { type: Boolean, default: false },
    totalSettledAmount: {
        value: { type: Number, default: 0 },
        currency: { type: String, default: "INR" }
    },
    totalNotSettledAmount: {
        value: { type: Number, default: 0 },
        currency: { type: String, default: "INR" }
    },
    expectedAmount: {
        value: { type: Number, default: 0 },
        currency: { type: String, default: "INR" }
    },
    recon_accord: { type: Boolean, default: false },
    reconRecieve: { type: Boolean, default: false },
    reconMessageId: { type: String, default: "" },
    reconTTL: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("bnp-rsf-settle-requests", buyerRsfSettleSchema);
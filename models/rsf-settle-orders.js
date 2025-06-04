const mongoose = require("mongoose");

const onSettleDetailsSchema = new mongoose.Schema({
    currency: { type: String, default: "INR" },
    value: { type: Number, default: 0 },
    status: { type: String, default: "NOT_SETTLED", enum: ["NOT_SETTLED", "SETTLED"] },
    error: {
        code: { type: Number, default: 0 },
        message: { type: String, default: "" }
    },
    reference_no: { type: String, default: "" }
}, { _id: false })

const rsfSettleOrders = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    totalOrderAmount : 
    {
        currency: { type: String, default: "INR" },
        value: { type: Number, default: 0 }
    },
      expectedAmount: {
        value: { type: Number, default: 0 },
        currency: { type: String, default: "INR" }
    },
    inter_participantDetails: onSettleDetailsSchema,
    collectorDetails: onSettleDetailsSchema,
     selfDetails: onSettleDetailsSchema, 
    providerDetails: {
        id: { type: String, required: true }, 
        name: { type: String, required: true }, 
        bank_details: {
            account_no: { type: String, default: "Not Available" },
            ifsc_code: { type: String, default: "Not Available" }
        },
 amount: {                
    currency: { type: String, default: "INR" },
    value: { type: Number, default: 0 }
    },
     status: { type: String, default: "NOT_SETTLED", enum: ["NOT_SETTLED", "SETTLED"] },
    error: {
        code: { type: Number, default: 0 },
        message: { type: String, default: "" }
    },
    reference_no: { type: String, default: "" }
    },
    settlementData: { type: Object, required: true },
    on_settlePendingAmount: {
        currency: { type: String, default: "INR" },
        value: { type: Number, default: 0 }
    },
    on_settleSettledAmount: {
        currency: { type: String, default: "INR" },
        value: { type: Number, default: 0 }
    },
    on_settle_recieve: { type: Boolean, required: true, default: false },
    recon_receive: { type: Boolean, required: true, default: false },
    recon_accord: { type: Boolean, default: false },
   reconPendingAmount: {                
    currency: { type: String, default: "INR" },
    value: { type: Number, default: 0 }
    },
     reconSettledAmount: {                
    currency: { type: String, default: "INR" },
    value: { type: Number, default: 0 }
    },
     onReconPendingAmount: {                
    currency: { type: String, default: "INR" },
    value: { type: Number, default: 0 }
    },
     onReconSettledAmount: {                
    currency: { type: String, default: "INR" },
    value: { type: Number, default: 0 }
    },
     onReconPendingDiffValue:{
        currency:{type: String, default:"INR"},
        value:{type:Number, value: 0}
    },
    onReconSettledDiffValue:{
        currency:{type: String, default:"INR"},
        value:{type:Number, value: 0}
    },
    paymentId: { type: String, default: "" },
    onReconDueDate: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("rsf-settle-orders", rsfSettleOrders);

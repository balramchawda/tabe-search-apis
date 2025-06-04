const mongoose = require("mongoose");

const sellerSubscriptionSchema = new mongoose.Schema(
  { 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', index: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true,index: true },
    renewalDate: { type: Date, required: true },
    status: { type: String, enum: ["Active", "Inactive" ,"Pending"], default: "Inactive", index: true },
    subscriptionType: { type: String, enum: ["Standard", "Premium"], required: true },
    amount: { type: Number, default: 0},
    storeName: { type: String, required: true },
    sellerName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    category: { type: String, 
      // enum: ["Grocery", "F&B"], 
      required: true },
    subscriptionPlan: { type: String,   enum: ["OneMonth", "ThreeMonths", "SixMonths","OneYear", "Admin"], required: true },
    paymentType: { type: String, enum: ["FirstTime", "Renewal","Admin"], required: true },
    razorPayOrderId: { type: String, required: false, default: null },
    transactionId: { type: String },
    transactionFee: { type: Number },
    razorpayPaymentId: { type: String },
    paidAmount: { type: Number},
    isManualUpdate: { type: Boolean},
    previousSubscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "sellersubscriptions" },
    invoiceUrl: { type: String},
    createdBy: { type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("sellerSubscription", sellerSubscriptionSchema);

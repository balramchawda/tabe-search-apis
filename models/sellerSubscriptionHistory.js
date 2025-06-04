const mongoose = require("mongoose");

const sellerSubscriptionLogsSchema = new mongoose.Schema(
  { 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', index: true },
    updatedBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', index: true },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "sellersubscriptions" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true,index: true },
    isManualUpdate: { type: Boolean},
    action: { type: String},
    status: { type: String, enum: ["Active", "Inactive" ,"Pending"]},
    subscriptionType: { type: String, enum: ["Standard", "Premium"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("seller-subscription-history", sellerSubscriptionLogsSchema);

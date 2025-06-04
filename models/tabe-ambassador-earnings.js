const mongoose = require("mongoose");

const tabeAmbassadorEarningsSchema = new mongoose.Schema(
  {
    ambassadorId: { type: String, default: ""},
    userId: { type: String, required: true },
    orderId: { type: String, required: true},
    orderAmount: { type: Number, required: true },
    orderEarning: { type: Number, required: true },
    referalCode: { type: String },
    earningStatus: {
      type: String,
      enum: ["InProgress", "Cleared"],
      default: "InProgress",
    },
    percentValue: { type: Number, required: true },
    earningType:  {
      type: String,
      enum: ["Credit", "Debit"],
      default: "Credit",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "tabe-ambassador-earning",
  tabeAmbassadorEarningsSchema,
);

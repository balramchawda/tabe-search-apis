const mongoose = require("mongoose");

const tabeAmbassadorSchema = new mongoose.Schema(
  {
    ambassadorId: { type: String, required: true, unique: true },
    referalCode: { type: String, required: true, unique: true },
    ambassadorName: { type: String, required: true },
    isAmbassador: { type: Boolean, default: false },
    mobileNumber: { type: String, required: true },
    modifiedReferalCode: { type: String, required: true},
    orderEarningCap: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tabeAmbassador", tabeAmbassadorSchema, "tabe-ambassador");


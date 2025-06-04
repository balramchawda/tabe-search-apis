const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    deliveryPartner: { type: String, required: true, default: "" },
    status: { type: String, default: "" },
    orderRef: { type: String }, // 'kikoorders', 'ondcorders,
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    deliveryPartnerOrderId: { type: String },
    deliveryPartnerTaskId: { type: String, required: true, default: "" },
    rawData: { type: Object, default: {} },
  },
  { timestamps: true }
);

Schema.virtual("KikoOrders", {
  ref: "kikoorders",
  localField: "orderId",
  foreignField: "_id",
  justOne: true,
});

Schema.virtual("OndcOrders", {
  ref: "ondcorders",
  localField: "orderId",
  foreignField: "deliveryPartnerTaskId",
  justOne: true,
});

module.exports = mongoose.model("deliverywebhook", Schema);

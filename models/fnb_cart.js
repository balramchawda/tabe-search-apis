var mongoose = require("mongoose");
var cartSchema = new mongoose.Schema(
  {
    messageId: { type: String },
    total: { type: Number, default: 0 },
    context: { type: Object, default: {} },
    quote: { type: Object, default: {} },
    items: { type: Array, default: [] },
    raw: { type: {}, default: {} },
    payment: { type: {}, default: {} },
    billingAddress: { type: {}, default: {} },
    selectFulfillment: { type: Object, default: {} },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("fnb-cart", cartSchema);

const mongoose = require('mongoose');
const constant = require("../Constants");
const Schema = new mongoose.Schema(
  {
    orderId: { type: String, default: "" },
    eventDateTime: { type: Date },
    eventType: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    borzoOrderId: { type: String, default: "" },
    deliveryId: { type: String, default: "" },
    status: { type: String, default: "" },
    requestParams: { type: Object, default: {} },
  },
  { timestamps: true }
);
module.exports = mongoose.model('borzowebhookresponses', Schema);

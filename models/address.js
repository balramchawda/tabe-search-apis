const mongoose = require('mongoose');
const constant = require("../Constants");
const addressSchema = new mongoose.Schema(
  {
    addressId: { type: String }, //deprecated
    user_id: { type: String, ref: "User", require: true, index: true },
    status: { type: String, default:constant.AddressStatus.Active, enum: [constant.AddressStatus.Active, constant.AddressStatus.Default, constant.AddressStatus.Delete] },
    contactName: { type: String, require: true },
    contactPhone: { type: String, require: true },
    mobile: { type: String, default: "" },
    region: {
      latitude: { type: String },
      longitude: { type: String },
      latitudeDelta: { type: String },
      longitudeDelta: { type: String }
    },
    address_line1: { type: String, require: true },
    address_line2: { type: String },
    building: { type: String },
    emailId: { type: String },
    city: { type: String, require: true, default: " " },
    state: { type: String, require: true, default: " " },
    zipcode: { type: String, require: true, default: "India" },
    tag: { type: String },
    userId: { type: String }, //deprecated,
    uId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model('ShippingAddress', addressSchema);

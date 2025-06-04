const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
     providerId: { type: String, default: "" },
    value: { type: String, default: "" },
    snp: { type: String, default: ""},
    key: { type: Number, default: ""}
  },
  { timestamps: true }
);
module.exports = mongoose.model("FnBOfferImages", schema, "fnb-seller-offerImages");

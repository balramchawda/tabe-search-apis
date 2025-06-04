const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    providerId: { type: String, default: "" },
    bgImage: { type: String, default: "" },
    leftImage: { type: String, default: "" },
    rightImage: { type: String, default: "" },
    snp: { type: String, default: ""},
    key: { type: Number, default: ""}
  },
  { timestamps: true }
);
module.exports = mongoose.model("fnb-seller-banners", schema);
const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  { 
    id: { type: String, required: true },
    descriptor: { type: Object, default: {} },
    tags: { type: Array, default: [] },
    providerId: { type: String, default: "" }
  },
  {
    timestamps: true 
  }
);
module.exports = mongoose.model("buyerappvariantcategories", schema);

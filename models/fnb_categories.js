const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    categories: { type: Array, default: "" },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'fnb-sellers' }    
  },
  { timestamps: true }
);
module.exports = mongoose.model("fnb-categories", schema);

const mongoose = require("mongoose");

const deepLinkSchema = new mongoose.Schema(
  { 
    type : { type: String, required: true}, 
    deepLinkId: { type: String, unique: true, required: true, index: true },
    deepLinkUrl: { type: String, required: true },
    schema: { type: String, required: true, default: "" },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ondcdeeplink", deepLinkSchema);

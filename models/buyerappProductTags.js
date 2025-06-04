const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    status : { type: String ,default:"active" },
    tagName:{ type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("buyer-product-tag", schema);


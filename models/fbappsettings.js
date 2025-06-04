const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    carouselImages: { type: Array },
    offerImages: { type: Array },
    dealoftheday: { type: Array },
    brands: { type: Array },
    categories: { type: Array },
    ambassadorSettings: { type: Object}
  },
  { timestamps: true }
);
module.exports = mongoose.model("fb-app-settings", schema);
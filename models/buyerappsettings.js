const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    carouselImages: { type: Array },
    offerImages: { type: Array },
    dealoftheday: { type: Array },
    brands: { type: Array },
    categories: { type: Array },

  },
  { timestamps: true }
);
module.exports = mongoose.model("buyerappsettings", schema);
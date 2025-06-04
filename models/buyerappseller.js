const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    photo: { type: String, default: "" },
    context: { type: Object, default: {} },
    loc: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [75.857722, 22.719633] }
    },
    locations: { type: Object, default: {} },
    storeStatus: { type: String, default: "enable" },
    providerStatus: { type: Object },
    providerId: { type: String, default: "" },
    categoryIds: { type: Array, default: [] },
    subCategoryIds: { type: Array, default: [] },
    serviceabilityRadius: { type: Array, default: [] },
    bppDescriptor: { type: Object, default: {} },
    minimumOrderValue: { type: Number, default: 0 },
    maxDiscountPercentage: { type: Number, default: 0 },
    storeTagline: { type: String, default: "" },
    storeTags: { type: String, default: '' },
    isBlock: { type: Boolean, default: false },
    snpBlocked: { type: Boolean, default: true },
    timeToShip: { type: Number },
    isShowQC: { type: Boolean, default: false },
    providerOnSearchStatus: { type: String, default: "" },
    kikoVisibility: { type: Boolean, default: true },
    rating: { type: Number}
  },
  { timestamps: true }
);
module.exports = mongoose.model("buyerappseller", schema);

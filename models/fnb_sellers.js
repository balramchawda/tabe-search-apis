const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    photo: { type: String, default: "" },
    context: { type: Object, default: {} },
    loc: {
      type: { type: String, enum: ["Point"] },
      coordinates: { type: [Number], default: [77.1025, 28.7041] }
    },
    locations: { type: Array, default: {} },
    storeStatus: { type: String, default: "enable" },
    providerStatus: { type: Object },
    providerId: { type: String, unique: true },
    categoryIds: { type: Array, default: [] },
    categories: { type: mongoose.Schema.Types.ObjectId, ref: 'fnb-categories' },
    subCategoryIds: { type: Array, default: [] },
    serviceabilityRadius: { type: Array, default: [] },
    bppDescriptor: { type: Object, default: {} },
    minimumOrderValue: { type: Number, default: 0 },
    maxDiscountPercentage: { type: Number, default: 0 },
    storeTagline: { type: String, default: "" },
    storeTags :{type: String, default: ''},
    isBlock: { type: Boolean, default: false },
    snpBlocked: { type: Boolean, default: true },
    timeToShip: { type: Number },
    isShowQC: { type: Boolean, default: false },
    providerOnSearchStatus: { type: String, default: "" },
    averageRatings: { type: String, default: "0" },
    totalRatings: { type: String, default: "0" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("fnb-sellers", schema);

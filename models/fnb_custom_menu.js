const mongoose = require("mongoose");
const customMenuSchema = new mongoose.Schema(
  {
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'fnb-sellers' },    
    timeFrom: { type: String },
    timeTo: { type: String},
    status: { type: String},
    dayFrom: { type: String },
    dayTo: { type: String},
    menuName: { type: String},
    rank: {type: String},
    generateMenuId: { type: String},
    image: { type: String },
    isActive: {type: Boolean, default: true},
    itemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fnb-catalogues' }],
    categoryTag : { type: String, default: "" },

  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("fnb-custom-menu", customMenuSchema);

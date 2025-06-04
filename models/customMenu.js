const mongoose = require("mongoose");
const coinWalletUserSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timeFrom: { type: String },
    timeTo: { type: String},
    status: { type: String},
    dayFrom: { type: String },
    dayTo: { type: String},
    menuName: { type: String},
    generateMenuId: { type: String},
    petpoojaCatId:{type: String, defualt: ""},
    isActive: {type: Boolean, default: true}

  },
  { timestamps: true,versionKey: false }
);

module.exports = mongoose.model("custommenus", coinWalletUserSchema);

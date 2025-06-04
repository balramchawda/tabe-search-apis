const mongoose = require("mongoose");
const customGroupSchema = new mongoose.Schema(
  {
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'fnb-sellers' },    
    sequence: { type: String },
    input: { type: String, defualt: 'select'},
    max: { type: String},
    min: { type: String },
    type: { type: String, defualt: 'custom_group'},
    customGroupName: { type: String},
    generateGroupId: { type: String},
    isActive: {type: Boolean, default: true},
    itemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fnb-custom-group-items' }],
    childItemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fnb-custom-group-items' }]
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("fnb-custom-group", customGroupSchema);

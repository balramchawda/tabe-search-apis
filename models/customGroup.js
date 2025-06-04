const mongoose = require("mongoose");
const customgroup = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sequence: { type: String },
    input: { type: String, defualt: 'select'},
    max: { type: String},
    min: { type: String },
    type: { type: String, defualt: 'custom_group'},
    customGroupName: { type: String},
    generateGroupId: { type: String},
    addGroupId: { type: String, default: ""},
    isActive: {type: Boolean, default: true},
    petpoojaItemId:{type: String, default: ""}
  },
  { timestamps: true,versionKey: false }
);

module.exports = mongoose.model("customgroups", customgroup);

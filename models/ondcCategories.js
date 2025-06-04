const mongoose = require("mongoose");

const ondcCategories = new mongoose.Schema({
    title: { type: String },
    subCategories: { type: Array },
    newSubCategories: { type: Array },
    status: { type: String, enum: ["published", "unpublished"] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

}, { timestamps: true });
module.exports = mongoose.model("ondcsellercategories", ondcCategories);
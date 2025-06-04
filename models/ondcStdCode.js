const mongoose = require("mongoose");

const ondcStdCodes = new mongoose.Schema({
    pincode: { type: String },
    city: { type: String },
    state: { type: String },
    stdcode: { type: String }
}, { timestamps: true });
module.exports = mongoose.model("ondcStdCodes", ondcStdCodes);
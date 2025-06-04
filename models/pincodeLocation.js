const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        pincode: { type: String, default: "" },
        location: { type: Object, default: {} }
    },
    { timestamps: true }
);
module.exports = mongoose.model('pincode-locations', schema);
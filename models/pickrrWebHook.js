const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        orderId: { type: String, default: "" },
        requestParams: { type: Object, default: {} },
        trackingId : { type: String, default: "" },
        status : { type: String, default: "" }
    },
    { timestamps: true }
);
module.exports = mongoose.model('pickrrwebhooks', schema);
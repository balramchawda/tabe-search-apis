const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        orderId: { type: String, default: "" },
        requestParams: { type: Object, default: {} },
        responseParams: { type: Object, default: {} },
        trackingId : { type: String, default: "" }
    },
    { timestamps: true }
);
module.exports = mongoose.model('deliveryvendordatas', schema);
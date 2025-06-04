const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        minDistance: { type: Number },
        maxDistance: { type: Number },
        actualCost: { type: Number },
        discountOffered: { type: Number },
        deliveryCost: { type: Number },
        discountAllowed: { type: Boolean },
        deliveryAllocatePriority1: { type: String },
        deliveryAllocatePriority2: { type: String },
        hyperLocalUserId: { type: Array },
        hyperLocalDeliveryCost: { type: Number }
    },
    { timestamps: true }
);
module.exports = mongoose.model('ondcdeliverycosting', schema);
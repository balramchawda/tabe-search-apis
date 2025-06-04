const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        minDistance: { type: Number },
        maxDistance: { type: Number },
        minWeight: { type: Number },
        maxWeight: { type: Number },
        actualCost: { type: Number },
        discountOffered: { type: Number },
        deliveryCost: { type: Number },
        discountAllowed: { type: Boolean }, 
        deliveryAllocatePriority1: { type: String },
        deliveryAllocatePriority2: { type: String }
    },
    { timestamps: true }
);
module.exports = mongoose.model('buyerdeliverycosting', schema);
const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        minDistance: { type: Number },
        maxDistance: { type: Number },
        minWeight: { type: Number },
        maxWeight: { type: Number },
        deliveryCost: { type: Number },
        deliveryAllocatePriority1: { type: String },
        deliveryAllocatePriority2: { type: String }
    },
    { timestamps: true }
);
module.exports = mongoose.model('deliverycosting', schema);
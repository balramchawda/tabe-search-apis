const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const constant = require("../Constants");

const schema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'kikoorders' },
        vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        amount: { type: Number, required: true, default: 0 },
        dunzoRequestParams: { type: Object, default: {} },
        dunzoResponseParams: { type: Object, default: {} },
        apiVendor : { type: String, required: true, default: "dunzo" }
    },
    { timestamps: true }
);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('dunzoorders', schema);
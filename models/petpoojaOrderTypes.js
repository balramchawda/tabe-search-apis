const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        restaurantid: { type: String, default: "" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        ordertypeid: { type: String, default: "" },
        ordertype : { type: String, default: "" },
    },
    { timestamps: true }
);
module.exports = mongoose.model('petpoojaordertypes', schema);
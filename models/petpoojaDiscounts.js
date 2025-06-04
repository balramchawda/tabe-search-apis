const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        restaurantid: { type: String, default: "" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        discountid: { type: String, default: "" },
        discountname: { type: String, default: "" },
        discounttype: { type: String, default: "" },
        discount: { type: String, default: "" },
        discountordertype: { type: String, default: "" },
        discountapplicableon: { type: String, default: "" },
        discountdays: { type: String, default: "" },
        active : { type: String, default: "" },
        discountontotal : { type: String, default: "" },
        discountstarts : { type: String, default: "" },
        discountends : { type: String, default: "" },
        discounttimefrom : { type: String, default: "" },
        discounttimeto : { type: String, default: "" },
        discountminamount : { type: String, default: "" },
        discounthascoupon : { type: String, default: "" },
        discountcategoryitemids : { type: String, default: "" },
        discountmaxlimit : { type: String, default: "" },
    },
    { timestamps: true }
);
module.exports = mongoose.model('petpoojadiscounts', schema);


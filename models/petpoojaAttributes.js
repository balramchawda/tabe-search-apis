const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        restaurantid: { type: String, default: "" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        attributeid: { type: String, default: "" },
        attribute: { type: String, default: "" },
        active : { type: String, default: "" },
    },
    { timestamps: true }
);
module.exports = mongoose.model('petpoojaattributes', schema);
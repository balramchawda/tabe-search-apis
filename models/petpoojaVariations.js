const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        restaurantid: { type: String, default: "" },
        variationid: { type: String, default: "" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        name: { type: String, default: "" },
        groupname: { type: String, default: "" },
        status: { type: String, default: "" },
    },
    { timestamps: true }
);
module.exports = mongoose.model('petpoojavariations', schema);
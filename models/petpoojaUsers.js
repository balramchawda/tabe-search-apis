const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        restaurantid: { type: String, default: "" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        active: { type: String, default: "" },
        details : { type: Object, default: {} },
        turn_on_time:{ type: String},
    },
    { timestamps: true }
);
module.exports = mongoose.model('petpoojausers', schema);
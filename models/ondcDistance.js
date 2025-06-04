const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        googleDistance: { type: Number },
        dunzoDistance: { type: Number },
        geoNearDistance: { type: Number },
        shadowfaxDistance: { type: Number }

    },
    { timestamps: true }
);
module.exports = mongoose.model('ondcdistance', schema);
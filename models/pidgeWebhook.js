const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        data : { type: Object, default: {} }
    },
    { timestamps: true }
);
module.exports = mongoose.model('pidgewebhook', schema);
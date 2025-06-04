var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { withdrawStatusEnum } = require("../Constants");

var schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    deviceName: { type: String, default: "" },
    ip: { type: String, default: "" },
    deviceType: { type: String, default: "" },
    email: { type: String, default: "" },
    fid: { type: String, default: "" },
    loginType: { type: String, default: "" },
    mobile: { type: String, default: "" },
    accessToken: { type: String, default: "" },
    deviceToken: { type: String, default: "" },
    type: { type: String, default: "" },
}, { timestamps: true });

// plugins
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('userTrackers', schema);

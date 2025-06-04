var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String },
    userId: { type: String },
    userName: { type: String },
    role: { type: String },
    storeName: { type: String },
    deviceName:{ type: String  },
    deviceType: { type: String },
    email: { type: String },
    accountCreatedDate: { type: Date },
    reason: { type: String },
    otherReasonText: { type: String },
    deviceId: { type: String },
},
{ timestamps: true, strict: false });
module.exports = mongoose.model('deletedaccounts', schema);
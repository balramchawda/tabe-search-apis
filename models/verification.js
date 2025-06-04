var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

// transform for sending as json
function omitPrivate(doc, obj) {
    delete obj.__v;
    delete obj.id;
    delete obj.verified;
    return obj;
}

// schema options
var options = { toJSON: { transform: omitPrivate } };

// schema
var schema = new Schema({
    type: { type: String, required: true },
    value: { type: String, index: { unique: true } },
    purpose: { type: String, required: true },
    code: { type: String, required: true },
    userType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expireAfterSeconds: "300" },//5 mins
    verified: { type: Boolean, default: false, required: true }
}, options);

// model
module.exports = mongoose.model('Verification', schema);

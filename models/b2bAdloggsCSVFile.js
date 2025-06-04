const { object, number } = require('joi');
var mongoose = require('mongoose');

var b2badloggs = new mongoose.Schema({
    b2bTripId: { type: String, required: false},
    b2bShipmentOrderId: { type: String, default: "" },
    csvFileUrl: { type: String, default: "" },
    },
{ timestamps: true }
);
module.exports = mongoose.model('b2badloggscsvfile', b2badloggs);
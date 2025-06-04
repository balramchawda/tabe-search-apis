var mongoose = require('mongoose');
var errorSchema = new mongoose.Schema({
    functionName: { type: String },
    fileName: { type: String },
    transactionId: { type: String },
    orderId: { type: String },
    error: { type: mongoose.Schema.Types.Mixed},
},{ timestamps: true });


module.exports = mongoose.model('errorlogs', errorSchema);
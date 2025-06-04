var mongoose = require('mongoose');
var ondcLogisticSchema = new mongoose.Schema({
    transactionId: { type: String },
    action: { type: String },
    reqBody: { type: Object, default: {} },
    response: { type: Object },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
    {
        timestamps: true // This will add `createdAt` and `updatedAt` fields
    }
);
module.exports = mongoose.model('ondcLogistic', ondcLogisticSchema);
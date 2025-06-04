var mongoose = require('mongoose');
var ondcSearcheRequestSchema = new mongoose.Schema({
    transactionId: { type: String },
    providerId: { type: String },
    action: { type: String },
    reqBody: { type: Object, default: {} },
    isIncremental : { type: Boolean, default: false },
    processedRequests: { type: Array, default: [] },
    pendingRequests: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now },
    type: { type: String, default: 'all' },
    incrementalType: { type: String },
    responseSent: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now },
    reqResponse: { type: Object, default: {} },
    
});
module.exports = mongoose.model('ondcQueueSearchRequest', ondcSearcheRequestSchema);
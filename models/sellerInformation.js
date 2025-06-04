var mongoose = require('mongoose');
var TaskSchema = new mongoose.Schema({
    requestParams: { type: Object, default: {} },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('sellerInformation', TaskSchema);
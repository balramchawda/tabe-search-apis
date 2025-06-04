var mongoose = require('mongoose');
var coinSchema = new mongoose.Schema({
 otherUserId:{ type: String, default: "" }, // userId who 
 userId:{ type: String, default: "" }, // userId who want to follow 
 itemId:{ type: String, default: "" }, // videoId,commentId,sid
 itemType:{ type: String, default: "" }, // itemType can be watch,comment, share
 coin:{ type: Number, default: 0 },
 createdDate:{ type: Date, default: Date.now },
 updatedDate:{ type: Date, default: Date.now }
},{ timestamps: true });
module.exports = mongoose.model('Coins', coinSchema);
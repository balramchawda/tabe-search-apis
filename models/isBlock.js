var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var userSchema = new mongoose.Schema({
 userId:{ type: String, default: "" }, // userId who want to userId 
 otherUserId:{ type: String, default: "" }, // userId to whom Block userId 
//  createdDate:{ type: Date, default: Date.now },
//  updatedDate:{ type: Date, default: Date.now },
uId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, 
otherUId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' } 
},{ timestamps: true });

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('isBlockUsers', userSchema);
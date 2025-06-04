var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
 fId:{ type: String, index:true, unique:true },
 loginType:{type:String},//google/facebook/apple/phone
 userId:{type:String,ref:'User'}, 
 uId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' } 
},{ timestamps: true });
module.exports = mongoose.model('userType', userSchema);

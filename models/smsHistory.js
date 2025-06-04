var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
 phone:{ type: String, default: "" }, 
 reqParams:{ type: String, default: "" },
 resParams: { type: String, default: "" },
 vendor:{ type: String, default: "" }
},{ timestamps: true });


module.exports = mongoose.model('smshistory', userSchema);
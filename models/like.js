var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var userSchema = new mongoose.Schema({
 userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }, 
 videoId:{ type: mongoose.Schema.Types.ObjectId, ref: 'videos' }, 
},{ timestamps: true });

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('likes', userSchema);

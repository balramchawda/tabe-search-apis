var mongoose = require('mongoose');
var categorySchema = new mongoose.Schema({
  categoryId:String,
  title:String,
  status:String,
  image:String,
  type:String,
  icon:String,
  createdAt:{ type: Date, default: Date.now },
  updatedAt:{ type: Date, default: Date.now },
},{versionKey: false});
module.exports = mongoose.model('Categories', categorySchema);

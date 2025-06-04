var mongoose = require('mongoose');
var itemsSchema = new mongoose.Schema({
  productId:String,
  userId:String,
  title:String,
  imageuri:[],
  categories:[],
  additional_info:{ type:Object, default:{} },
  desc: { type: String, default:''  },
  link: { type: String, default:'https://www.gizmobaba.co.in/'  },
  price: Number,
  status:{ type: String, default:'active'  },
  createdAt:{ type: Date, default: Date.now },
  updatedAt:{ type: Date, default: Date.now },
});
module.exports = mongoose.model('ProductItems', itemsSchema);
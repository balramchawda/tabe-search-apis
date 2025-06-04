var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
// var videoSchema = new mongoose.Schema({
//   productId:String,
//   userId:String,
//   productIndex:String,
//   title:String,
//   imageuri:[],
//   videos:[],
//   categories:[],
//   additional_info:{ type:Object, default:{} },
//   desc: { type: String, default:''  },
//   link: { type: String, default:'https://www.gizmobaba.co.in/'  },
//   price: Number,
//   likeCounts:{ type: Number, default:0  },
//   viewsCounts:{ type: Number, default:0  },
//   commentsCount:{ type: Number, default:0  },
//   isLiked:{ type: Boolean, default:false  },
//   status:{ type: String, default:'active'  },
//   createdAt:{ type: Date, default: Date.now },
//   updatedAt:{ type: Date, default: Date.now },

//   thumb_url:{ type: String, default: "https://dllzbdcl80ev1.cloudfront.net/kikotv_placeholder.jpeg" },
//   gif_url:{ type: String, default: "https://dllzbdcl80ev1.cloudfront.net/kiko.gif" },

//   productsIds:{ type:Array, default:[] },
//   products:{ type:Array, default:[] },

//   isOptimized:{ type: Boolean, default: false },
//   video_op_path:{ type: String, default:''  },
//   priority:{ type: String, default: "shuffle" }

// });
// module.exports = mongoose.model('Products', videoSchema);

let schema = new mongoose.Schema({
  name: { type: String, default: '' },
  brandLogo: { type: String, default: '' },
  brandName: { type: String, default: '' },
  bgImage: { type: String, default: '' },
  type: { type: String, default: '' },
  imageList: { type: Array, default: [] },
  videoHlsList: { type: Array, default: [] },
  coinPrice: { type: Number, default: 0 },
  regularPrice: { type: Number, default: 0 },
  expiresOn: { type: String, default: '' },
  offerDetails: { type: String, default: '' },
  redeemSteps: { type: String, default: '' },
  shippingCharge: { type: Number, default: 0 },
  shippingChargeCoins: { type: Number, default: 0 },
  productDetails: { type: Array, default: [] },
  productDescription: { type: String, default: '' },
  isReturnable: { type: Boolean, default: false },
  isDelivery: { type: Boolean, default: true },
  deliveryDetails: { type: String, default: '' },
  isStatus: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false },
  isOriginal: { type: Boolean, default: true },
  isSecure: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  link: { type: String, default: '' },


  couponCode: { type: Array, default: [] },
  couponInventory: { type: Number, default: 1 },
  couponValue: { type: String, default: "" },
  orderId: { type: Number, default: 99 },
  sku: { type: String, default: "" },
  quantity : { type: Number, required: false, default: 0 },

});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('products', schema);

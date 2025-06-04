var mongoose = require('mongoose');
const constant = require('../Constants');
const mongoosePaginate = require("mongoose-paginate-v2");

var videoSchema = new mongoose.Schema({
  vindex:{ type: Number, default:0  },
  videoId:String,
  userId:String,
  title:String,
  video_path:String,
  likeCounts:{ type: Number, default:0  },
  viewsCounts:{ type: Number, default:0  },
  commentsCount:{ type: Number, default:0  },
  isLiked:{ type: Boolean, default:false  },
  subcategories:[],
  category:String,
  contact_phone:{ type: String, default:''  },
  status:{ type: String, default:'blocked',enum:[constant.videoStatus.Blocked,constant.videoStatus.InReview,constant.videoStatus.Delete,constant.videoStatus.Published,constant.videoStatus.Waiting_for_review]},
  time:String,
  createdAt:{ type: Date, default: Date.now },

  flag:{
    bad_content:{ type: Number, default: 0 },//
    copyright : { type: Number, default: 0 }
  },
  flag_new:{
    sexual_activity:{ type: Number, default: 0 },// 2 
    offering_sexual_activity:{ type: Number, default: 0 },// 3 
    female_nude_visibility:{ type: Number, default: 0 },// 4 
    nudity_visibility:{ type: Number, default: 0 },// 5 
    bad_languge:{ type: Number, default: 0 }// 6 
  },
  
  thumb_url:{ type: String, default: "https://dllzbdcl80ev1.cloudfront.net/kikotv_placeholder.jpeg" },
  gif_url:{ type: String, default: "https://dllzbdcl80ev1.cloudfront.net/kiko.gif" },
  sthumb_url:{ type: String, default: "" },
  
  //for making a video featured on listing 
  isFeatured:{ type: Boolean, default: false },
  isOptimized:{ type: Boolean, default: false },
  video_op_path:{ type: String, default:''  },
  video_op_path2:{ type: String, default:''  },
  isOptimized2:{ type: Boolean, default: false },
  productsTaggedUrl:{type:String, default: ''},
  buttonName:{type:String, default: ''}, 
  buttonLink:{type:String, default: ''},
  buttonTitle:{type:String, default: ''}, // Title
  buttonImage:{type:String, default: ''}, // Image
  buttonDescription:{type:String, default: ''},  // Description 
  role:{type:String},
  videoPathHls: { type: String, default: '' },
  hlsVideoRequest: { type: String, default: '' },
  videoMeta: { type: Object, default: {} }
});
videoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Videos', videoSchema);


// "Published";
// "Blocked";

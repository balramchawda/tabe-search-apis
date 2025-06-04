var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var eventSchema = new mongoose.Schema({
    appType:{ type: String, default:''  },
    eventName:{ type: String, default:''  },
    orderId:{ type: String, default:''  }    
},{ timestamps: true });

// userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('meta-pixel-event', eventSchema);

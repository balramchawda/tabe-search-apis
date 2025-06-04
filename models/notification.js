var mongoose = require('mongoose');
const Schema = mongoose.Schema
var notificationSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: 'Videos'
  },
  offerId: {
    type: Schema.Types.ObjectId,
    ref: 'Offers'
  }, 
  selectedUser: { type: String, default: "" },
  title:String,
  type: String,
  time: String,
  createdAt:{ type: Date, default: Date.now },
  updatedAt:{ type: Date, default: Date.now },
});

module.exports = mongoose.model('Notifications', notificationSchema);

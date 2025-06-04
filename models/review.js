var mongoose = require('mongoose');
var reviewSchema = new mongoose.Schema({
  reviewId: String,
  productId: String,
  user: {},
  rating: { type: Number, default: 0 },
  comment: String,
  time: String,
  status: String, // published, blocked
  type: { type: String, default: "video" },
  date:{type:Date, default:Date.now()}
});
module.exports = mongoose.model('reviews', reviewSchema);
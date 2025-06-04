var mongoose = require('mongoose');
var reviewSchema = new mongoose.Schema({
  value: { type: String, default: "" },
});
module.exports = mongoose.model('printer', reviewSchema);
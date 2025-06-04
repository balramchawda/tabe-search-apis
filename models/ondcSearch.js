var mongoose = require('mongoose');
var ondcSchema = new mongoose.Schema({
  context:{ type: Object, default: {} },
  message:{ type: Object, default: {} },
  provider:{ type: Object, default: {} },
  location:{ type: Object, default: {} },
  loc: String,
  location:{ type: Object, default: {} },
  area_code: String,
  createdAt:{ type: Date, default: Date.now },
  updatedAt:{ type: Date, default: Date.now },
});
module.exports = mongoose.model('ondcSearches', ondcSchema);
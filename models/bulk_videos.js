var mongoose = require('mongoose');
var bulkVideosSchema = new mongoose.Schema({
	file_url: String,
    thumb_url: String,
    gif_url: String,
    file_name: String,
    category: { type:String, default:"" }
});
module.exports = mongoose.model('BulkVideos', bulkVideosSchema);
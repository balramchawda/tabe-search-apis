var mongoose = require('mongoose');
var audioSchema = new mongoose.Schema({
  audioId:String,
  audio_name:String,
  audio_path:String,
  section_name:String
});
module.exports = mongoose.model('Audios', audioSchema);
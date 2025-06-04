var mongoose = require('mongoose');
var eventActivitySchema = new mongoose.Schema({
 userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, 
 eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'events' },
 activity: { type: String },
},{ timestamps: true });

module.exports = mongoose.model('eventActivity', eventActivitySchema);

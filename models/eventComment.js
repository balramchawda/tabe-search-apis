var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Events' },
    comment: { type: String, default: "" },
},
{ timestamps: true });
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('eventComment', schema);
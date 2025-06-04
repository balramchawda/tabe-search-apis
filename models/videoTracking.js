var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { withdrawStatusEnum } = require("../Constants");

var schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'videos' },
    watchCount: { type: Number, default: 0 }
}, { timestamps: true });

// plugins
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('videoTrackers', schema);

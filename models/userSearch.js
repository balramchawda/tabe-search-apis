var mongoose = require('mongoose');

var userSearchSchema = new mongoose.Schema({
    searchKeys: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    count: { type: Number },
    city: { type: String },
    pincode: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('usersearch', userSearchSchema); 
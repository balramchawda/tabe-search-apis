const mongoose = require('mongoose');

const settingsNewSchema = new mongoose.Schema({
  keys:{ type:String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('settings', settingsNewSchema);

const mongoose = require('mongoose');
const Schema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    status: { type: Boolean, require: true }, 
  },
  { timestamps: true }
);
module.exports = mongoose.model('flagreports', Schema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  telegram_id: { type: Number, required: true, unique: true },
  telegram_username: { type: String },
  profile_picture: { type: String },
  auth_date: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
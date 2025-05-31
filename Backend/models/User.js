const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  telegram_id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String },
  username: { type: String },
  photo_url: { type: String },
  auth_date: { type: Number, required: true },
  hash: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

// Add index for telegram_id
userSchema.index({ telegram_id: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
const User = require('../models/User');

async function getUser(req, res) {
  try {
    // Accept telegram_id as query param
    const telegram_id = req.query.telegram_id;
    if (!telegram_id) {
      return res.status(400).json({ error: 'telegram_id is required' });
    }
    const user = await User.findOne({ telegram_id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getUser };
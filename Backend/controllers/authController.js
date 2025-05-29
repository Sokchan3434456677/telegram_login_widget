const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SESSION_SECRET } = require('../config/env'); // Still needed for JWT signing

exports.checkTelegramAuth = async (req, res) => {
  try {
    const authData = req.query;
    
    // Verify Telegram hash
    const checkHash = authData.hash;
    delete authData.hash;
    
    const dataCheckArr = [];
    for (const key in authData) {
      dataCheckArr.push(`${key}=${authData[key]}`);
    }
    dataCheckArr.sort();
    const dataCheckString = dataCheckArr.join('\n');
    
    const secretKey = crypto.createHash('sha256').update(process.env.BOT_TOKEN).digest();
    const hash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
    
    if (hash !== checkHash) {
      return res.status(401).json({ error: 'Data is NOT from Telegram' });
    }
    
    if ((Date.now() / 1000 - authData.auth_date) > 86400) {
      return res.status(401).json({ error: 'Data is outdated' });
    }
    
    // Prepare user data
    const userData = {
      first_name: authData.first_name,
      last_name: authData.last_name || null,
      telegram_id: authData.id,
      telegram_username: authData.username || null,
      profile_picture: authData.photo_url || null,
      auth_date: authData.auth_date
    };
    
    // Check if user exists and update or create
    const user = await User.findOneAndUpdate(
      { telegram_id: authData.id },
      { $set: userData },
      { new: true, upsert: true }
    );

    // Generate JWT
    const token = jwt.sign(
      { telegram_id: user.telegram_id, _id: user._id },
      SESSION_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ success: true, user, token });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

exports.logout = (req, res) => {
  // Stateless logout: client just deletes the token
  res.json({ success: true });
};

exports.checkAuth = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SESSION_SECRET);
    const user = await User.findOne({ telegram_id: decoded.telegram_id });
    if (user) {
      return res.json(user);
    }
    res.status(401).json({ error: 'Unauthorized' });
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
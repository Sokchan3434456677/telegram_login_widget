const User = require('../models/User');
const { verifyTelegramAuth } = require('../utils/telegramAuth');
const jwt = require('jsonwebtoken');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Handle Telegram authentication
exports.telegramAuth = async (req, res) => {
  try {
    const authData = req.query;
    
    // Verify the authentication data
    if (!verifyTelegramAuth(BOT_TOKEN, authData)) {
      return res.status(401).json({ success: false, error: 'Invalid authentication data' });
    }

    // Find or create user
    let user = await User.findOne({ telegram_id: authData.id });
    
    if (!user) {
      user = new User({
        telegram_id: authData.id,
        first_name: authData.first_name,
        last_name: authData.last_name || '',
        username: authData.username || '',
        photo_url: authData.photo_url || '',
        auth_date: authData.auth_date,
        hash: authData.hash,
      });
      await user.save();
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({ 
      success: true, 
      user: {
        _id: user._id,
        telegram_id: user.telegram_id,
        first_name: user.first_name,
        last_name: user.last_name,
        telegram_username: user.username,
        profile_picture: user.photo_url,
      },
      token 
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ success: false, error: 'Authentication failed' });
  }
};

// Check authentication status
exports.checkAuth = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-hash -__v');

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ 
      success: true, 
      user: {
        _id: user._id,
        telegram_id: user.telegram_id,
        first_name: user.first_name,
        last_name: user.last_name,
        telegram_username: user.username,
        profile_picture: user.photo_url,
      }
    });
  } catch (error) {
    console.error('Authentication check error:', error);
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

// Logout
exports.logout = async (req, res) => {
  // Since we're using JWT, logout is handled client-side by removing the token
  res.json({ success: true, message: 'Logged out successfully' });
};
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Telegram authentication
router.get('/auth', authController.telegramAuth);

// Check authentication status
router.get('/check-auth', authController.checkAuth);

// Logout
router.post('/logout', authController.logout);

module.exports = router;
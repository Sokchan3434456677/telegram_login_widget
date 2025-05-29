const express = require('express');
const router = express.Router();
const { checkTelegramAuth, logout } = require('../controllers/authController');

router.get('/auth', checkTelegramAuth);
router.get('/logout', logout);

module.exports = router;
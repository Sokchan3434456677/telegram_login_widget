const express = require('express');
const router = express.Router();
const { logout } = require('../controllers/authController');

router.get('/logout', logout);

module.exports = router;
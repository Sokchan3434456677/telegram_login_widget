const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/user?telegram_id=xxxx
router.get('/user', userController.getUser);

module.exports = router;

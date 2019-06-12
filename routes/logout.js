const express = require('express');
const auth = require('../middleware/auth');
const logoutController = require('../controllers/logout');

const router = express.Router();

//route to log in
router.post('/', auth, logoutController.logout);

module.exports = { router };

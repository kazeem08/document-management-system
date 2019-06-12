const express = require('express');
const Joi = require('@hapi/joi');
const loginController = require('../controllers/login');

const router = express.Router();

//route to log in
router.post('/', loginController.login);

module.exports = { router };

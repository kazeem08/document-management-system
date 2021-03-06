const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const userController = require('../controllers/user');

const router = express.Router();

//routet to get all users
router.get('/', [auth, admin], userController.getAllUsers);

//route to get user by Id
router.get('/me', auth, userController.getById);

//route to create user
router.post('/', userController.createUser);

//route to update user
router.put('/me', auth, userController.updateUser);

//route to delete
router.delete('/me', auth, userController.deleteUser);

module.exports = { router };

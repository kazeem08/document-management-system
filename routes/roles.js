const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const roleController = require('../controllers/role');
const router = express.Router();

//route to get all roles
router.get('/', [auth, admin], roleController.getRoles);

//route to get role by id
router.get('/:id', [validateObjectId, auth, admin], roleController.getById);

//route to create a role
router.post('/', [auth, admin], roleController.createRole);

//route to update a role
router.put('/:id', [validateObjectId, auth, admin], roleController.updateRole);

//route to delete a role
router.delete(
	'/:id',
	[validateObjectId, auth, admin],
	roleController.deleteRole
);

module.exports = { router };

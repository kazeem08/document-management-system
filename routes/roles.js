import express from 'express';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';
import { Role, validateRole } from '../models/role';
import { validateObjectId } from '../middleware/validateObjectId';
import { roleController } from '../controllers/role';
const router = express.Router();

//route to get all roles
router.get('/', [auth, admin], roleController.getRoles);

//route to get role by id
router.get('/:id', [validateObjectId, auth, admin], roleController.getById);

//route to create a role
router.post('/', [auth, admin], roleController.createRole);

router.put('/', validateObjectId, async (req, res) => {
	// const { error } = validateRole(req.body);
	// if (error) return res.status(400).send(error.details[0].message);

	// let role = await Role.findOne({ title: req.body.title });
	// if (role) return res.status(400).send('Role already exist');

	// role = new Role({
	// 	title: req.body.title
	// });

	// await role.save();
	res.send();
});

export { router as roles };

import express from 'express';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';
import { Role, validateRole } from '../models/role';
import { validateObjectId } from '../middleware/validateObjectId';

const router = express.Router();

//route to get all roles
router.get('/', [auth, admin], async (req, res) => {
	const roles = await Role.find();
	res.send(roles);
});

//route to get role by id
router.get('/:id', validateObjectId, [auth, admin], async (req, res) => {
	const role = await Role.findById(req.params.id);
	if (!role) return res.status(404).send('There is no role with the ID');
	res.send();
});

//route to create a role
router.post('/', [auth, admin], async (req, res) => {
	const { error } = validateRole(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let role = await Role.findOne({ title: req.body.title });
	if (role) return res.status(400).send('Role already exist');

	role = new Role({
		title: req.body.title
	});

	await role.save();
	res.send(role);
});

export { router as roles };

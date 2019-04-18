import express from 'express';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';
import { Role, validateRole } from '../models/role';

const router = express.Router();

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

import express from 'express';
import { User, validate } from '../models/user';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';
import { validateObjectId } from '../middleware/validateObjectId';

const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
	const users = await User.find();
	res.send(users);
});

router.get('/:id', validateObjectId, [auth, admin], async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) return res.status(404).send('No user exist with this ID');
	res.send(user);
});

router.post('/', async (req, res) => {
	// const { error } = validate(req.body);
	// if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('user already exist');

	res.send();
});

export { router as users };

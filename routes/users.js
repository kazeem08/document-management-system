import express from 'express';
import { User } from '../models/user';
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

router.post('/', auth, async (req, res) => {
	res.send();
});

export { router as users };

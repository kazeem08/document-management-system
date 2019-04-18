import express from 'express';
import { User } from '../models/user';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';

const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
	const users = await User.find();
	res.send(users);
});

export { router as users };

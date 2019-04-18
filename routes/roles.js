import express from 'express';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';

const router = express.Router();

router.post('/', auth, async (req, res) => {
	if (req.user.role.title !== 'Admin')
		return res.status(403).send('Access Denied');
	res.send();
});

export { router as roles };

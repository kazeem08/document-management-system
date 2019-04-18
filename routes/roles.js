import express from 'express';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';

const router = express.Router();

router.post('/', auth, async (req, res) => {
	// await res.status(401).send('Unauthorized');
	res.send();
});

export { router as roles };

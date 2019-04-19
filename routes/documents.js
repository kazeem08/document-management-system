import express from 'express';
import { Document } from '../models/document';
import { User } from '../models/user';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, async (req, res) => {
	const user1 = await User.findById(req.body.userId);
	if (!user1) return res.status(400).send('Invalid user');
	const document = new Document({
		title: req.body.title,
		user: {
			_id: user1._id,
			title: user1.title
		},
		access: req.body.access,
		content: req.body.content
	});
	res.send(document);
});

export { router as documents };

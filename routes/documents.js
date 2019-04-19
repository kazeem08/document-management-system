import express from 'express';
import { Document } from '../models/document';
import { User } from '../models/user';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/private', auth, async (req, res) => {
	const document = await Document.find({
		'user._id': req.user._id,
		access: 'private'
	});

	res.send(document);
});

router.post('/', auth, async (req, res) => {
	const user1 = await User.findById(req.body.userId);
	if (!user1) return res.status(400).send('Invalid user');
	const document = new Document({
		title: req.body.title,
		user: {
			_id: user1._id,
			firstName: user1.firstName,
			role: {
				_id: user1.role._id,
				title: user1.role.title
			}
		},
		access: req.body.access,
		content: req.body.content
	});
	await document.save();
	res.send(document);
});

export { router as documents };

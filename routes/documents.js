import express from 'express';
import { Document } from '../models/document';
import { User } from '../models/user';
import { auth } from '../middleware/auth';

const router = express.Router();

//route to get all documents
router.get('/:page', auth, async (req, res) => {
	let perPage = 9;
	let page = req.params.page || 1;
	let skip = perPage * page - perPage;

	const document = await Document.find()
		.or([
			{ access: 'public' },
			{ 'user._id': req.user._id },
			{ 'user.role.title': req.user.role.title }
		])
		.limit(perPage)
		.skip(skip);

	if (document.length < 1) return res.status(404).send('no record found');

	res.send(document);
});

//route for getting document with private access
router.get('/private', auth, async (req, res) => {
	const document = await Document.find({
		'user._id': req.user._id,
		access: 'private'
	});

	if (document.length < 1) return res.status(404).send('no record found');

	res.send(document);
});

//route to get users particular to a role with access = role
router.get('/role', auth, async (req, res) => {
	const document = await Document.find({
		access: 'role',
		'user.role.title': req.user.role.title
	});

	if (document.length < 1) return res.status(404).send('no record found');

	res.send(document);
});
//route for creating a document
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

import express from 'express';
import { Document } from '../models/document';
import { User } from '../models/user';
import { auth } from '../middleware/auth';
import { validateDocument } from '../models/document';
import { validateObjectId } from '../middleware/validateObjectId';

const router = express.Router();

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

// route to get all documents
router.get('/:page', auth, async (req, res) => {
	let perPage = 10;
	let page = req.params.page || 1;
	let skip = perPage * page - perPage;

	let document;
	if (req.user.role.title === 'Admin') {
		document = await Document.find();
	} else {
		document = await Document.find()
			.or([
				{ access: 'public' },
				{ 'user._id': req.user._id },
				{ 'user.role.title': req.user.role.title }
			])
			.limit(perPage)
			.skip(skip)
			.sort('-dateCreated');
	}

	if (document.length < 1) return res.status(404).send('no record found');

	res.send(document);
});

//route for creating a document
router.post('/', auth, async (req, res) => {
	const { error } = validateDocument(req.body);
	if (error) return res.status(400).send(error.details[0].message);

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

//route to update documents
router.put('/:id', validateObjectId, auth, async (req, res) => {
	let document = await Document.findById(req.params.id);
	if (!document) return res.status(404).send('document does not exist');

	document = await Document.findByIdAndUpdate(
		req.params.id,
		{
			title: req.body.title,
			user: {
				_id: document.user._id,
				title: document.user.title
			},
			content: req.body.content,
			access: req.body.access
		},
		{ new: true }
	);
	res.send(document);
});

router.delete('/:id', validateObjectId, auth, async (req, res) => {
	let document = await Document.findById(req.params.id);
	if (!document) return res.status(404).send('document does not exist');

	document = await Document.findByIdAndDelete(req.params.id);

	res.send(document);
});

export { router as documents };

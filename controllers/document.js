const doc = require('../models/document');
const userModel = require('../models/user');

class DocumentController {
	//method to get private access documents
	async getPrivateDocs(req, res) {
		const document = await doc.Document.find({
			'user._id': req.user._id,
			access: 'private'
		});

		if (document.length < 1) return res.status(404).send('no record found');

		res.send(document);
	}

	//method to get role access documents
	async getRoleDocs(req, res) {
		const document = await doc.Document.find({
			access: 'role',
			'user.role.title': req.user.role.title
		});

		if (document.length < 1) return res.status(404).send('no record found');

		res.send(document);
	}

	//method to get all documents
	async getAllDocs(req, res) {
		let perPage = Number(req.query.perPage) || 10;
		let page = req.query.page || 1;
		let skip = perPage * page - perPage;
		let document;
		if (req.user.role.title === 'Admin') {
			document = await doc.Document.find()
				.limit(perPage)
				.skip(skip)
				.sort('-dateCreated');
		} else {
			document = await doc.Document.find()
				.or([
					{ access: 'public' },
					{ 'user._id': req.user._id },
					{ 'user.role.title': req.user.role.title, access: { $ne: 'private' } }
				])
				.limit(perPage)
				.skip(skip)
				.sort('-dateCreated');
		}

		if (document.length < 1) return res.status(404).send('no record found');

		res.send(document);
	}

	//method to create documents
	async createDocs(req, res) {
		const { error } = doc.validateDocument(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const user1 = await userModel.User.findById(req.user._id);

		const document = new doc.Document({
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
	}

	//method to update documents
	async updateDocs(req, res) {
		let document = await doc.Document.findById(req.params.id);
		if (!document) return res.status(404).send('document does not exist');

		document = await doc.Document.findByIdAndUpdate(
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
	}

	//method for deleting document
	async deleteDocs(req, res) {
		let document = await doc.Document.findById(req.params.id);
		if (!document) return res.status(404).send('document does not exist');

		document = await doc.Document.findByIdAndDelete(req.params.id);

		res.send(document);
	}
}

const documentController = new DocumentController();

module.exports = documentController;

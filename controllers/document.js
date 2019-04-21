import { Document } from '../models/document';

class DocumentController {
	async getPrivateDocs(req, res) {
		const document = await Document.find({
			'user._id': req.user._id,
			access: 'private'
		});

		if (document.length < 1) return res.status(404).send('no record found');

		res.send(document);
	}

	async getRoleDocs(req, res) {
		const document = await Document.find({
			access: 'role',
			'user.role.title': req.user.role.title
		});

		if (document.length < 1) return res.status(404).send('no record found');

		res.send(document);
	}

	async getAllDocs(req, res) {
		let perPage = Number(req.query.perPage) || 10;
		let page = req.query.page || 1;
		let skip = perPage * page - perPage;
		let document;
		if (req.user.role.title === 'Admin') {
			document = await Document.find()
				.limit(perPage)
				.skip(skip)
				.sort('-dateCreated');
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
	}
}

const documentController = new DocumentController();

export { documentController };

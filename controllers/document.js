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
}

const documentController = new DocumentController();

export { documentController };

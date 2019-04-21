import express from 'express';
import { Document } from '../models/document';
import { User } from '../models/user';
import { auth } from '../middleware/auth';
import { validateObjectId } from '../middleware/validateObjectId';
import { documentController } from '../controllers/document';
const router = express.Router();

//route for getting document with private access
router.get('/private', auth, documentController.getPrivateDocs);

//route to get users particular to a role with access = role
router.get('/role', auth, documentController.getRoleDocs);

// route to get all documents
router.get('/', auth, documentController.getAllDocs);

//route for creating a document
router.post('/', auth, documentController.createDocs);

//route to update documents
router.put('/:id', validateObjectId, auth, documentController.updateDocs);

router.delete('/:id', validateObjectId, auth, async (req, res) => {
	let document = await Document.findById(req.params.id);
	if (!document) return res.status(404).send('document does not exist');

	document = await Document.findByIdAndDelete(req.params.id);

	res.send(document);
});

export { router as documents };

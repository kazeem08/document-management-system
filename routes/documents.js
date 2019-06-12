const express = require('express');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const documentController = require('../controllers/document');
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

router.delete('/:id', validateObjectId, auth, documentController.deleteDocs);

module.exports = { router };

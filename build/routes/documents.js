"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.documents = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../middleware/auth");

var _validateObjectId = require("../middleware/validateObjectId");

var _document = require("../controllers/document");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //route for getting document with private access


exports.documents = router;
router.get('/private', _auth.auth, _document.documentController.getPrivateDocs); //route to get users particular to a role with access = role

router.get('/role', _auth.auth, _document.documentController.getRoleDocs); // route to get all documents

router.get('/', _auth.auth, _document.documentController.getAllDocs); //route for creating a document

router.post('/', _auth.auth, _document.documentController.createDocs); //route to update documents

router.put('/:id', _validateObjectId.validateObjectId, _auth.auth, _document.documentController.updateDocs);
router["delete"]('/:id', _validateObjectId.validateObjectId, _auth.auth, _document.documentController.deleteDocs);
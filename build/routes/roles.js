"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roles = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../middleware/auth");

var _admin = require("../middleware/admin");

var _validateObjectId = require("../middleware/validateObjectId");

var _role = require("../controllers/role");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //route to get all roles


exports.roles = router;
router.get('/', [_auth.auth, _admin.admin], _role.roleController.getRoles); //route to get role by id

router.get('/:id', [_validateObjectId.validateObjectId, _auth.auth, _admin.admin], _role.roleController.getById); //route to create a role

router.post('/', [_auth.auth, _admin.admin], _role.roleController.createRole); //route to update a role

router.put('/:id', [_validateObjectId.validateObjectId, _auth.auth, _admin.admin], _role.roleController.updateRole); //route to delete a role

router["delete"]('/:id', [_validateObjectId.validateObjectId, _auth.auth, _admin.admin], _role.roleController.deleteRole);
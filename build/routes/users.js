"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../middleware/auth");

var _admin = require("../middleware/admin");

var _user = require("../controllers/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //routet to get all users


exports.users = router;
router.get('/', [_auth.auth, _admin.admin], _user.userController.getAllUsers); //route to get user by Id

router.get('/me', _auth.auth, _user.userController.getById); //route to create user

router.post('/', _user.userController.createUser); //route to update user

router.put('/me', _auth.auth, _user.userController.updateUser); //route to delete

router["delete"]('/me', _auth.auth, _user.userController.deleteUser);
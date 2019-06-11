"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = void 0;

var _express = _interopRequireDefault(require("express"));

var _logout = require("../controllers/logout");

var _auth = require("../middleware/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //route to log in


exports.logout = router;
router.post('/', _auth.auth, _logout.logoutController.logout);
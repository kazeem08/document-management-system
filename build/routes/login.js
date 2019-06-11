"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
exports.login = void 0;

var _express = _interopRequireDefault(require("express"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _login = require("../controllers/login");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //route to log in


exports.login = router;
router.post('/', _login.loginController.login); //joi validation for login

function validate(req) {
  var schema = {
    email: _joi["default"].string().min(7).max(200).required().email(),
    password: _joi["default"].string().min(5).max(255).required()
  };
  return _joi["default"].validate(req, schema);
}
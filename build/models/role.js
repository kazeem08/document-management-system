"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRole = validateRole;
exports.roleSchema = exports.Role = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//creating roleSchema
var roleSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 30,
    "default": 'Regular'
  }
}); //creating Role model

exports.roleSchema = roleSchema;

var Role = _mongoose["default"].model('Role', roleSchema);

exports.Role = Role;
var roles = Role.find();

if (roles.length < 1) {
  Role.insertMany([{
    title: 'Admin'
  }, {
    title: 'Regular'
  }]).then(function () {})["catch"](function (err) {});
} //joi validation for role model


function validateRole(role) {
  var schema = {
    title: _joi["default"].string().min(5).max(30).required()
  };
  return _joi["default"].validate(role, schema);
}
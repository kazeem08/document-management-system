"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUser = validateUser;
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _role = require("./role");

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//creating user schema
var userSchema = new _mongoose["default"].Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 7,
    maxlength: 200,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 200
  },
  role: {
    type: _role.roleSchema,
    required: true
  }
}); //getting the jwt key from the environment

var jwtKey = process.env.jwtPrivateKey; //generating jwt authentication key

userSchema.methods.generateAuthToken = function () {
  var token = _jsonwebtoken["default"].sign({
    _id: this._id,
    role: this.role
  }, jwtKey);

  return token;
}; //creating user model


var User = _mongoose["default"].model('User', userSchema); //joi validation for role model


exports.User = User;

function validateUser(user) {
  var schema = {
    firstName: _joi["default"].string().min(3).max(100).required(),
    lastName: _joi["default"].string().min(3).max(100).required(),
    userName: _joi["default"].string().min(3).max(100).required(),
    email: _joi["default"].string().min(7).max(200).required().email(),
    password: _joi["default"].string().min(6),
    roleId: _joi["default"].objectId().required()
  };
  return _joi["default"].validate(user, schema);
}
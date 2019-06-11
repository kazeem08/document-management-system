"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDocument = validateDocument;
exports.documentSchema = exports.Document = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _role = require("../models/role");

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//creating custom user schema
var userSchema = new _mongoose["default"].Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  role: {
    type: _role.roleSchema,
    required: true
  }
}); //creating document schema

var documentSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    max: 200
  },
  user: {
    type: userSchema,
    required: true
  },
  access: {
    type: String,
    "default": 'public',
    minlength: 3,
    maxlength: 20
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000
  }
}, {
  timestamps: true
}); //creating document model

exports.documentSchema = documentSchema;

var Document = _mongoose["default"].model('Document', documentSchema); // Joi validation for document schema


exports.Document = Document;

function validateDocument(document) {
  var schema = {
    title: _joi["default"].string().min(5).max(200).required(),
    access: _joi["default"].string().min(5).max(20),
    content: _joi["default"].string().min(10).max(1000).required()
  };
  return _joi["default"].validate(document, schema);
}
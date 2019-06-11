"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateObjectId = validateObjectId;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Validating object Id in the endpoint
function validateObjectId(req, res, next) {
  if (!_mongoose["default"].Types.ObjectId.isValid(req.params.id)) return res.status(404).send('Invalid ID');
  next();
}
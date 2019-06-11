"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = error;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//error handling for server
function error(err, req, res, next) {
  // winston.log("error", err.message);
  _winston["default"].error(err.message, err);

  res.status(500).send('Something failed');
}
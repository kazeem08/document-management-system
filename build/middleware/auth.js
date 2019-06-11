"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = auth;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import config from 'config';
_dotenv["default"].config(); //authentication to verify jwt token


function auth(req, res, next) {
  var token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied! No token provided');

  try {
    var decoded = _jsonwebtoken["default"].verify(token, process.env.jwtPrivateKey);

    req.user = decoded;
    next();
  } catch (_unused) {
    res.status(400).send('Invalid token');
  }
}
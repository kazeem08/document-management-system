"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var db; //checking if the envionment is test

if (process.env.NODE_ENV === 'test') {
  db = process.env.db_test;

  _mongoose["default"].connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }).then(function () {
    return _winston["default"].info("connected to ".concat(db));
  });
} //checking if the envionment is staging


if (process.env.NODE_ENV === 'staging') {
  db = process.env.db;

  _mongoose["default"].connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }).then(function () {
    return _winston["default"].info("connected to ".concat(db));
  }); //checking if the envionment is production

} else if (process.env.NODE_ENV === 'production') {
  db = process.env.db_production;

  _mongoose["default"].connect(db, {
    useNewUrlParser: true
  }).then(function () {
    return _winston["default"].info('connected to mongo db...');
  })["catch"](function (err) {
    return _winston["default"].info(err);
  });
}
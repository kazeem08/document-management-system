"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandling = errorHandling;

var _winston = _interopRequireDefault(require("winston"));

require("express-async-errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// require("winston-mongodb");
function errorHandling() {
  _winston["default"].handleExceptions(new _winston["default"].transports.Console({
    colorize: true,
    prettyPrint: true
  }), new _winston["default"].transports.File({
    filename: 'uncaughtExceptions.log'
  }));

  process.on('unhandledRejection', function (ex) {
    // winston.error(ex.message, ex);
    throw ex;
  });

  _winston["default"].add( // new winston.transports.File({ filename: "logfile.log"})
  _winston["default"].transports.File, {
    filename: 'logfile.log'
  }); // winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });

}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _joiObjectid = _interopRequireDefault(require("joi-objectid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//validating objectId
var _default = _joi["default"].objectId = (0, _joiObjectid["default"])(_joi["default"]);

exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtKey = jwtKey;
//Validating jwt key
var jwt = process.env.jwtPrivateKey;

function jwtKey() {
  if (!jwt) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.admin = admin;

//middleware to validate admin role
function admin(req, res, next) {
  if (req.user.role.title !== 'Admin') return res.status(403).send('Access Denied');
  next();
}
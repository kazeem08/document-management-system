"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = routes;

var _roles = require("../routes/roles");

var _users = require("../routes/users");

var _login = require("../routes/login");

var _documents = require("../routes/documents");

var _logout = require("../routes/logout");

var _error = require("../middleware/error");

function routes(app) {
  app.use('/api/roles', _roles.roles);
  app.use('/api/users', _users.users);
  app.use('/api/login', _login.login);
  app.use('/api/documents', _documents.documents);
  app.use('/api/logout', _logout.logout);
  app.use(_error.error);
}
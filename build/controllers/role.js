"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roleController = void 0;

var _role = require("../models/role");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//creating role controller
var RoleController =
/*#__PURE__*/
function () {
  function RoleController() {
    _classCallCheck(this, RoleController);
  }

  _createClass(RoleController, [{
    key: "getRoles",
    //method to get all roles
    value: function () {
      var _getRoles = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var roles;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _role.Role.find();

              case 2:
                roles = _context.sent;
                res.send(roles);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getRoles(_x, _x2) {
        return _getRoles.apply(this, arguments);
      }

      return getRoles;
    }() //method to get role by ID

  }, {
    key: "getById",
    value: function () {
      var _getById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var role;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _role.Role.findById(req.params.id);

              case 2:
                role = _context2.sent;

                if (role) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.status(404).send('There is no role with the ID'));

              case 5:
                res.send();

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getById(_x3, _x4) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }() //method to create role

  }, {
    key: "createRole",
    value: function () {
      var _createRole = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var _validateRole, error, role;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _validateRole = (0, _role.validateRole)(req.body), error = _validateRole.error;

                if (!error) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", res.status(400).send(error.details[0].message));

              case 3:
                _context3.next = 5;
                return _role.Role.findOne({
                  title: req.body.title
                });

              case 5:
                role = _context3.sent;

                if (!role) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", res.status(400).send('Role already exist'));

              case 8:
                role = new _role.Role({
                  title: req.body.title
                });
                _context3.next = 11;
                return role.save();

              case 11:
                res.send(role);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createRole(_x5, _x6) {
        return _createRole.apply(this, arguments);
      }

      return createRole;
    }() //method to update role

  }, {
    key: "updateRole",
    value: function () {
      var _updateRole = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var _validateRole2, error, role;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _validateRole2 = (0, _role.validateRole)(req.body), error = _validateRole2.error;

                if (!error) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", res.status(400).send(error.details[0].message));

              case 3:
                _context4.next = 5;
                return _role.Role.findById(req.params.id);

              case 5:
                role = _context4.sent;

                if (role) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return", res.status(404).send('Role does not exist'));

              case 8:
                _context4.next = 10;
                return _role.Role.findByIdAndUpdate(req.params.id, {
                  title: req.body.title
                }, {
                  "new": true
                });

              case 10:
                role = _context4.sent;
                res.send(role);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updateRole(_x7, _x8) {
        return _updateRole.apply(this, arguments);
      }

      return updateRole;
    }() //method to delete role

  }, {
    key: "deleteRole",
    value: function () {
      var _deleteRole = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var role;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _role.Role.findById(req.params.id);

              case 2:
                role = _context5.sent;

                if (role) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return", res.status(404).send('Role does not exist'));

              case 5:
                res.send(role);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deleteRole(_x9, _x10) {
        return _deleteRole.apply(this, arguments);
      }

      return deleteRole;
    }()
  }]);

  return RoleController;
}();

var roleController = new RoleController();
exports.roleController = roleController;
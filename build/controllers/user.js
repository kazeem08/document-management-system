"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = require("../models/user");

var _role = require("../models/role");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//method for creating user
var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var users;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _user.User.find();

              case 2:
                users = _context.sent;
                res.send(users);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAllUsers(_x, _x2) {
        return _getAllUsers.apply(this, arguments);
      }

      return getAllUsers;
    }() //method for getting user by Id

  }, {
    key: "getById",
    value: function () {
      var _getById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _user.User.findById(req.user._id);

              case 2:
                user = _context2.sent;
                res.send(user);

              case 4:
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
    }() //method for creating user

  }, {
    key: "createUser",
    value: function () {
      var _createUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var _validateUser, error, user, role, salt;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _validateUser = (0, _user.validateUser)(req.body), error = _validateUser.error;

                if (!error) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", res.status(400).send(error.details[0].message));

              case 3:
                _context3.next = 5;
                return _user.User.findOne({
                  email: req.body.email
                });

              case 5:
                user = _context3.sent;

                if (!user) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", res.status(400).send('user already exist'));

              case 8:
                _context3.next = 10;
                return _role.Role.findById(req.body.roleId);

              case 10:
                role = _context3.sent;

                if (role) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt("return", res.status(400).send('Invalid role Id'));

              case 13:
                user = new _user.User({
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  userName: req.body.userName,
                  email: req.body.email,
                  password: req.body.password,
                  role: {
                    _id: role._id,
                    title: role.title
                  }
                });
                _context3.next = 16;
                return _bcrypt["default"].genSalt(10);

              case 16:
                salt = _context3.sent;
                _context3.next = 19;
                return _bcrypt["default"].hash(user.password, salt);

              case 19:
                user.password = _context3.sent;
                _context3.next = 22;
                return user.save();

              case 22:
                // res.send(user);
                res.send(_lodash["default"].pick(user, ['_id', 'firstName', 'lastName', 'userName', 'email']));

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createUser(_x5, _x6) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }() //method for updating user

  }, {
    key: "updateUser",
    value: function () {
      var _updateUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var user;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _user.User.findByIdAndUpdate(req.user._id, {
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  userName: req.body.userName,
                  email: req.body.email,
                  password: req.body.password,
                  role: {
                    _id: req.user.role._id,
                    title: req.user.role.title
                  }
                }, {
                  "new": true
                });

              case 2:
                user = _context4.sent;
                res.send(user);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updateUser(_x7, _x8) {
        return _updateUser.apply(this, arguments);
      }

      return updateUser;
    }() //method for deleting user

  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var user;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _user.User.findByIdAndDelete(req.user._id);

              case 2:
                user = _context5.sent;
                res.send(user);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deleteUser(_x9, _x10) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }()
  }]);

  return UserController;
}();

var userController = new UserController();
exports.userController = userController;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seed = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = require("./models/user");

var _role = require("./models/role");

var _document = require("./models/document");

var _faker = _interopRequireDefault(require("faker"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

require("./startup/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var app = (0, _express["default"])();
var port = process.env.PORT; //getting the port

app.listen(port, function () {
  return console.log("listening on port ".concat(port, "..."));
});

var Seeder =
/*#__PURE__*/
function () {
  function Seeder() {
    _classCallCheck(this, Seeder);
  }

  _createClass(Seeder, [{
    key: "seedUsers",
    value: function () {
      var _seedUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var role, role2, i, user, salt, user1;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _role.Role.findOne({
                  title: 'Admin'
                });

              case 2:
                role = _context.sent;
                _context.next = 5;
                return _role.Role.findOne({
                  title: 'Regular'
                });

              case 5:
                role2 = _context.sent;
                i = 0;

              case 7:
                if (!(i < 20)) {
                  _context.next = 26;
                  break;
                }

                user = {};

                if (i > 2) {
                  user.role = {
                    _id: role._id,
                    title: role.title
                  };
                } else {
                  user.role = {
                    _id: role2._id,
                    title: role2.title
                  };
                }

                user.firstName = _faker["default"].name.firstName();
                user.lastName = _faker["default"].name.lastName();
                user.userName = _faker["default"].internet.userName();
                user.email = _faker["default"].internet.email();
                _context.next = 16;
                return _bcrypt["default"].genSalt(10);

              case 16:
                salt = _context.sent;
                _context.next = 19;
                return _bcrypt["default"].hash('123456', salt);

              case 19:
                user.password = _context.sent;
                _context.next = 22;
                return _user.User.create(user);

              case 22:
                user1 = _context.sent;

              case 23:
                i++;
                _context.next = 7;
                break;

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function seedUsers() {
        return _seedUsers.apply(this, arguments);
      }

      return seedUsers;
    }()
  }, {
    key: "seedDocuments",
    value: function () {
      var _seedDocuments = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var access, i, users, document, user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                access = ['private', 'public', 'role'];
                i = 0;

              case 2:
                if (!(i < 10)) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 5;
                return _user.User.find();

              case 5:
                users = _context2.sent;
                document = {};
                document.title = _faker["default"].company.companyName();
                user = users[Math.floor(Math.random() * users.length)];
                document.user = {
                  _id: user._id,
                  firstName: user.firstName,
                  role: {
                    _id: user.role._id,
                    title: user.role.title
                  }
                };
                document.access = access[Math.floor(Math.random() * access.length)];
                document.content = _faker["default"].lorem.sentence();
                _context2.next = 14;
                return _document.Document.create(document);

              case 14:
                i++;
                _context2.next = 2;
                break;

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function seedDocuments() {
        return _seedDocuments.apply(this, arguments);
      }

      return seedDocuments;
    }()
  }]);

  return Seeder;
}();

var seed = new Seeder();
exports.seed = seed;

var seeding =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return seed.seedUsers();

          case 2:
            _context3.next = 4;
            return seed.seedDocuments();

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function seeding() {
    return _ref.apply(this, arguments);
  };
}(); // seed.seedDocuments();


seeding();
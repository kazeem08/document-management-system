"use strict";

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

// import { seed } from './seeder';
var app = (0, _express["default"])();
var port = process.env.PORT; //getting the port

// app.listen(port, () => console.log(`listening on port ${port}...`));
// async function seedRefresh() {
// 	await User.deleteMany({});
// 	await Document.deleteMany({});
// 	// await seed.seedUsers();
// 	// await seed.seedDocuments();
// }
// seedRefresh();
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
                return _user.User.deleteMany();

              case 2:
                _context.next = 4;
                return _role.Role.findOne({
                  title: 'Admin'
                });

              case 4:
                role = _context.sent;
                _context.next = 7;
                return _role.Role.findOne({
                  title: 'Regular'
                });

              case 7:
                role2 = _context.sent;
                i = 0;

              case 9:
                if (!(i < 20)) {
                  _context.next = 28;
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
                _context.next = 18;
                return _bcrypt["default"].genSalt(10);

              case 18:
                salt = _context.sent;
                _context.next = 21;
                return _bcrypt["default"].hash('123456', salt);

              case 21:
                user.password = _context.sent;
                _context.next = 24;
                return _user.User.create(user);

              case 24:
                user1 = _context.sent;

              case 25:
                i++;
                _context.next = 9;
                break;

              case 28:
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
                _context2.next = 2;
                return _document.Document.deleteMany();

              case 2:
                access = ['private', 'public', 'role'];
                i = 0;

              case 4:
                if (!(i < 10)) {
                  _context2.next = 19;
                  break;
                }

                _context2.next = 7;
                return _user.User.find();

              case 7:
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
                _context2.next = 16;
                return _document.Document.create(document);

              case 16:
                i++;
                _context2.next = 4;
                break;

              case 19:
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

function seeding() {
  return _seeding.apply(this, arguments);
}

function _seeding() {
  _seeding = _asyncToGenerator(
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
  return _seeding.apply(this, arguments);
}

seeding();
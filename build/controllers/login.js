"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginController = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = require("../models/user");

var _login2 = require("../routes/login");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoginController =
/*#__PURE__*/
function () {
  function LoginController() {
    _classCallCheck(this, LoginController);
  }

  _createClass(LoginController, [{
    key: "login",
    //method for logging in
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _validate, error, user, password, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _validate = (0, _login2.validate)(req.body), error = _validate.error;

                if (!error) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(400).send(error.details[0].message));

              case 3:
                _context.next = 5;
                return _user.User.findOne({
                  email: req.body.email
                });

              case 5:
                user = _context.sent;

                if (user) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.status(400).send('Invalid email or password'));

              case 8:
                _context.next = 10;
                return _bcrypt["default"].compare(req.body.password, user.password);

              case 10:
                password = _context.sent;

                if (password) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", res.status(400).send('Invalid email/password'));

              case 13:
                token = user.generateAuthToken();
                res.send({
                  token: token
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }]);

  return LoginController;
}();

var loginController = new LoginController();
exports.loginController = loginController;
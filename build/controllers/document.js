"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.documentController = void 0;

var _document = require("../models/document");

var _user = require("../models/user");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DocumentController =
/*#__PURE__*/
function () {
  function DocumentController() {
    _classCallCheck(this, DocumentController);
  }

  _createClass(DocumentController, [{
    key: "getPrivateDocs",
    //method to get private access documents
    value: function () {
      var _getPrivateDocs = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var document;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _document.Document.find({
                  'user._id': req.user._id,
                  access: 'private'
                });

              case 2:
                document = _context.sent;

                if (!(document.length < 1)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(404).send('no record found'));

              case 5:
                res.send(document);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getPrivateDocs(_x, _x2) {
        return _getPrivateDocs.apply(this, arguments);
      }

      return getPrivateDocs;
    }() //method to get role access documents

  }, {
    key: "getRoleDocs",
    value: function () {
      var _getRoleDocs = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var document;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _document.Document.find({
                  access: 'role',
                  'user.role.title': req.user.role.title
                });

              case 2:
                document = _context2.sent;

                if (!(document.length < 1)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.status(404).send('no record found'));

              case 5:
                res.send(document);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getRoleDocs(_x3, _x4) {
        return _getRoleDocs.apply(this, arguments);
      }

      return getRoleDocs;
    }() //method to get all documents

  }, {
    key: "getAllDocs",
    value: function () {
      var _getAllDocs = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var perPage, page, skip, document;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                perPage = Number(req.query.perPage) || 10;
                page = req.query.page || 1;
                skip = perPage * page - perPage;

                if (!(req.user.role.title === 'Admin')) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 6;
                return _document.Document.find().limit(perPage).skip(skip).sort('-dateCreated');

              case 6:
                document = _context3.sent;
                _context3.next = 12;
                break;

              case 9:
                _context3.next = 11;
                return _document.Document.find().or([{
                  access: 'public'
                }, {
                  'user._id': req.user._id
                }, {
                  'user.role.title': req.user.role.title,
                  access: {
                    $ne: 'private'
                  }
                }]).limit(perPage).skip(skip).sort('-dateCreated');

              case 11:
                document = _context3.sent;

              case 12:
                if (!(document.length < 1)) {
                  _context3.next = 14;
                  break;
                }

                return _context3.abrupt("return", res.status(404).send('no record found'));

              case 14:
                res.send(document);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getAllDocs(_x5, _x6) {
        return _getAllDocs.apply(this, arguments);
      }

      return getAllDocs;
    }() //method to create documents

  }, {
    key: "createDocs",
    value: function () {
      var _createDocs = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var _validateDocument, error, user1, document;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _validateDocument = (0, _document.validateDocument)(req.body), error = _validateDocument.error;

                if (!error) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", res.status(400).send(error.details[0].message));

              case 3:
                _context4.next = 5;
                return _user.User.findById(req.user._id);

              case 5:
                user1 = _context4.sent;
                document = new _document.Document({
                  title: req.body.title,
                  user: {
                    _id: user1._id,
                    firstName: user1.firstName,
                    role: {
                      _id: user1.role._id,
                      title: user1.role.title
                    }
                  },
                  access: req.body.access,
                  content: req.body.content
                });
                _context4.next = 9;
                return document.save();

              case 9:
                res.send(document);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function createDocs(_x7, _x8) {
        return _createDocs.apply(this, arguments);
      }

      return createDocs;
    }() //method to update documents

  }, {
    key: "updateDocs",
    value: function () {
      var _updateDocs = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var document;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _document.Document.findById(req.params.id);

              case 2:
                document = _context5.sent;

                if (document) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return", res.status(404).send('document does not exist'));

              case 5:
                _context5.next = 7;
                return _document.Document.findByIdAndUpdate(req.params.id, {
                  title: req.body.title,
                  user: {
                    _id: document.user._id,
                    title: document.user.title
                  },
                  content: req.body.content,
                  access: req.body.access
                }, {
                  "new": true
                });

              case 7:
                document = _context5.sent;
                res.send(document);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function updateDocs(_x9, _x10) {
        return _updateDocs.apply(this, arguments);
      }

      return updateDocs;
    }() //method for deleting document

  }, {
    key: "deleteDocs",
    value: function () {
      var _deleteDocs = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var document;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _document.Document.findById(req.params.id);

              case 2:
                document = _context6.sent;

                if (document) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt("return", res.status(404).send('document does not exist'));

              case 5:
                _context6.next = 7;
                return _document.Document.findByIdAndDelete(req.params.id);

              case 7:
                document = _context6.sent;
                res.send(document);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteDocs(_x11, _x12) {
        return _deleteDocs.apply(this, arguments);
      }

      return deleteDocs;
    }()
  }]);

  return DocumentController;
}();

var documentController = new DocumentController();
exports.documentController = documentController;
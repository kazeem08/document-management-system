'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require('express'));

require('./startup/validation');

require('dotenv/config');
require('babel-polyfill');
require('@babel/core');

var _winston = _interopRequireDefault(require('winston'));

var _morgan = _interopRequireDefault(require('morgan'));

var _bodyParser = _interopRequireDefault(require('body-parser'));

var _swaggerJsdoc = _interopRequireDefault(require('swagger-jsdoc'));

var _swaggerUiExpress = _interopRequireDefault(require('swagger-ui-express'));

var _logging = require('./startup/logging');

var _config2 = require('./startup/config');

var _routes = require('./startup/routes');

require('./startup/db');

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var option = {
	swaggerDefinition: {
		info: {
			title: 'Document-management-system',
			description: 'API collections',
			version: '5.0.0',
			contact: {
				email: 'kazeem0825@gmail.com'
			}
		},
		tags: [
			{
				name: 'Role',
				description: 'Role model'
			},
			{
				name: 'User',
				description: 'User model'
			},
			{
				name: 'Document',
				description: 'Document model'
			}
		]
	},
	apis: ['./src/swagger/*.yaml']
};
var spec = (0, _swaggerJsdoc['default'])(option);
var app = (0, _express['default'])();
exports.app = app;
app.use(
	_bodyParser['default'].urlencoded({
		extended: true
	})
);
app.use(_express['default'].json());
app.use((0, _morgan['default'])('tiny'));
app.use(
	'/api-docs',
	_swaggerUiExpress['default'].serve,
	_swaggerUiExpress['default'].setup(spec)
);
(0, _logging.errorHandling)();
(0, _config2.jwtKey)();
(0, _routes.routes)(app);
var port = process.env.PORT; //getting the port

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, function() {
		return _winston['default'].info('listening on port '.concat(port, '...'));
	});
}

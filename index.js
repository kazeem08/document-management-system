const express = require('express');
require('./startup/validation');
require('dotenv/config');
const winston = require('winston');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const errorHandling = require('./startup/logging');

const jwtKey = require('./startup/config');
const routes = require('./startup/routes');
require('./startup/db');

let option = {
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
			{ name: 'Role', description: 'Role model' },
			{ name: 'User', description: 'User model' },
			{ name: 'Document', description: 'Document model' }
		]
	},
	apis: ['./swagger/*.yaml']
};

const spec = swaggerJsdoc(option);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));

errorHandling();
jwtKey();
routes(app);

const port = process.env.PORT || 3000; //getting the port

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => winston.info(`listening on port ${port}...`));
}

module.exports = app;

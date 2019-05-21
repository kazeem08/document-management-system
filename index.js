import mongoose from 'mongoose';
import express from 'express';
import './startup/validation';
// import 'express-async-errors';
import 'dotenv/config';
import winston from 'winston';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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

import { errorHandling } from './startup/logging';
errorHandling();

import './startup/db';
import { jwtKey } from './startup/config';
jwtKey();
import { routes } from './startup/routes';
routes(app);

const port = process.env.PORT; //getting the port

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => winston.info(`listening on port ${port}...`));
}

export { app };

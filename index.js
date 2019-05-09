import mongoose from 'mongoose';
import express from 'express';
import './startup/validation';
// import 'express-async-errors';
import 'dotenv/config';
import winston from 'winston';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

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

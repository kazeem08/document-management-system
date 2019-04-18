import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config';
import Joi from 'Joi';
// import value from 'joi-objectid';
// Joi.objectId = value(Joi);

import { roles } from './routes/roles';
import { users } from './routes/users';

const app = express();

app.use(express.json());
app.use('/api/roles', roles);
app.use('/api/users', users);

const port = process.env.PORT;
let db = process.env.db;
if (process.env.NODE_ENV === 'test') db = process.env.db_test;

mongoose
	.connect(db, { useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log(`connected to ${db}`));

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => console.log(`listening on port ${port}...`));
}

export { app };

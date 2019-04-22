import mongoose from 'mongoose';
import winston from 'winston';

let db = process.env.db; //getting the db
if (process.env.NODE_ENV === 'test') db = process.env.db_test;

//connecting to database
mongoose
	.connect(db, { useNewUrlParser: true, useCreateIndex: true })
	.then(() => winston.info(`connected to ${db}`));

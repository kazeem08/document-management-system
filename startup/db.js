import mongoose from 'mongoose';
import winston from 'winston';

let db;

if (process.env.NODE_ENV === 'test') {
	db = process.env.db_test;
	mongoose
		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
		.then(() => winston.info(`connected to ${db}`));
}

if (process.env.NODE_ENV === 'staging') {
	mongoose
		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
		.then(() => winston.info(`connected to ${db}`));
} else if (process.env.NODE_ENV === 'production') {
	db = process.env.db_production;
	mongoose
		.connect(db, { useNewUrlParser: true })
		.then(() => console.log('connected to mongo db...'))
		.catch(err => console.log(err));
}

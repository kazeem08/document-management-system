import mongoose from 'mongoose';
import winston from 'winston';

let db;

//checking if the envionment is test
if (process.env.NODE_ENV === 'test') {
	db = process.env.db_test;
	mongoose
		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
		.then(() => winston.info(`connected to ${db}`));
}

//checking if the envionment is staging
if (process.env.NODE_ENV === 'staging') {
	db = process.env.db;

	mongoose
		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
		.then(() => winston.info(`connected to ${db}`));

	//checking if the envionment is production
} else if (process.env.NODE_ENV === 'production') {
	db = process.env.db_production;

	mongoose
		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
		.then(() => winston.info('connected to mongo db...'))
		.catch(err => winston.info(err));
}

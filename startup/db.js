import mongoose from 'mongoose';
import winston from 'winston';

let db = process.env.db; //getting the db
const uri = process.env.db;

if (process.env.NODE_ENV === 'test') {
	db = process.env.db_test;
	mongoose
		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
		.then(() => winston.info(`connected to ${db}`));
}

// const username = process.env.username;
// const password = process.env.password;

//connecting to database
// const uri = `mongodb+srv://${username}:${password}@document-management-bxuig.mongodb.net/test?retryWrites=true`;

if (process.env.NODE_ENV === 'staging') {
	mongoose
		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
		.then(() => winston.info(`connected to ${db}`));
} else if (process.env.NODE_ENV === 'production') {
	mongoose
		.connect(uri, { useNewUrlParser: true })
		.then(() => console.log('connected to mongo db...'))
		.catch(err => console.log(err));
}

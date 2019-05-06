import mongoose from 'mongoose';
import winston from 'winston';

let db = process.env.db; //getting the db
if (process.env.NODE_ENV === 'test') db = process.env.db_test;

//connecting to database
const uri =
	'mongodb+srv://dbUser:realmadrid_8899@document-management-bxuig.mongodb.net/test?retryWrites=true';

if (process.env.NODE_ENV === 'local') {
	mongoose
		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
		.then(() => winston.info(`connected to ${db}`));
} else if (process.env.NODE_ENV === 'development') {
	mongoose
		.connect(uri, { useNewUrlParser: true })
		.then(() => console.log('connected to mongo db...'))
		.catch(err => console.log(err));
}

import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config';

const app = express();

const port = process.env.PORT;
const db = process.env.db;
if (process.env.NODE_ENV === 'test') db = process.env.db_test;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log(`conected to ${db}`));

if (process.env.NODE_ENV !== 'tets') {
	app.listen(port, () => console.log(`listening on port ${port}...`));
}

export { app };

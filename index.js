import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config';
import config from 'config';
import { roles } from './routes/roles';

const app = express();

app.use(express.json());
app.use('/api/roles', roles);

const port = process.env.PORT;
let db = process.env.db;
if (process.env.NODE_ENV === 'test') db = process.env.db_test;

// let db = config.get('db');
// clea;

// const port = process.env.PORT || 3000;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log(`connected to ${db}`));

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => console.log(`listening on port ${port}...`));
}

export { app };

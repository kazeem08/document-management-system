import 'babel-polyfill';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../index';
import { User } from '../../models/user';

describe('Login', () => {
	const user = new User({
		firstName: 'Kazeem',
		lastName: 'lanre',
		userName: 'kazeem08',
		email: 'kazeem08@gmail.com',
		password: '123456',
		role: {
			_id: mongoose.Types.ObjectId(),
			title: 'Regular'
		}
	});
	afterEach(async () => {
		await User.deleteMany();
	});

	it('shoud if email is less than 7 characters', async () => {
		const res = await request(app)
			.post('/api/login')
			.send({ email: 'kah', password: '553888' });

		expect(res.status).toBe(400);
	});

	it('shoud if password is less than 6', async () => {
		const res = await request(app)
			.post('/api/login')
			.send({ email: 'kazeemoof@gmail.com', password: '5588' });

		expect(res.status).toBe(400);
	});

	it('shoud return 400 if user does not exist', async () => {
		const res = await request(app)
			.post('/api/login')
			.send({ email: 'kahhdhd@yahoo.com', password: '0909090909' });

		expect(res.status).toBe(400);
	});

	it('shoud return 400 if password does not match', async () => {
		await user.save();
		const res = await request(app)
			.post('/api/login')
			.send({ email: 'kazeem08@gmail.com', password: '6363553' });

		expect(res.status).toBe(400);
	});

	it('should login if inputs are valid', async () => {
		await User.collection.insertOne({
			firstName: 'Kazeem',
			lastName: 'lanre',
			userName: 'kazeem08',
			email: 'kazeem08@gmail.com',
			password: '123456',
			role: {
				_id: mongoose.Types.ObjectId(),
				title: 'Regular'
			}
		});
		const res = await request(app)
			.post('/api/login')
			.send({ email: 'kazeem08@gmail.com', password: '123456' });

		expect(res.status).toBe(200);
		expect(res.body).toBeDefined();
	});
});

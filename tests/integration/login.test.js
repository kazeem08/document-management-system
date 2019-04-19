import 'babel-polyfill';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../index';
import { User } from '../../models/user';

describe('Login', () => {
	afterEach(async () => {
		await User.deleteMany();
	});
	it('shoud if email and password are provided', async () => {
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

		await user.save();
		const res = await request(app)
			.post('/api/login')
			.send({ email: 'kahhdhd@yahoo.com', password: '6363553' });

		expect(res.status).toBe(400);
	});
});

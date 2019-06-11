import 'babel-polyfill';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../index';
import { User } from '../../models/user';

describe('Logout', () => {
	let token;
	const user = {
		_id: mongoose.Types.ObjectId().toHexString(),
		role: {
			_id: mongoose.Types.ObjectId().toHexString(),
			title: 'Admin'
		}
	};
	beforeEach(() => {
		token = new User(user).generateAuthToken();
	});

	afterEach(async () => {
		await User.deleteMany();
	});

	it('should log user out', async () => {
		const res = await request(app)
			.post('/api/logout')
			.set('x-auth-token', token);

		expect(res.body).toBeDefined();
	});
});

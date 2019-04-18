import 'babel-polyfill';
import request from 'supertest';
import mongoose from 'mongoose';
import { User } from '../../models/user';
import { app } from '../../index';

// //validate if user is logged in
describe('/api/roles', () => {
	describe('POST ', () => {
		let token;
		let name;
		const exec = async () => {
			return await request(app)
				.post('/api/roles')
				.set('x-auth-token', token)
				.send({ name });
		};
		beforeEach(() => {
			const user = {
				_id: mongoose.Types.ObjectId().toHexString(),
				role: {
					_id: mongoose.Types.ObjectId().toHexString(),
					title: 'Regular'
				}
			};
			token = new User(user).generateAuthToken();
			name = 'Admin';
		});
		it('should return 401 if user is not logged in', async () => {
			token = '';

			const res = await exec();
			expect(res.status).toBe(401);
		});

		it('should return 403 if user is not an admin', async () => {
			const res = await exec();
			expect(res.status).toBe(403);
		});
	});
});

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
				.send('x-auth-token', token)
				.send({ name });
		};
		beforeEach(() => {
			token = new User().generateAuthToken();
			name = 'Admin';
		});
		it('should return 401 if user is not logged in', async () => {
			token = '';
			const res = await exec();
			expect(res.status).toBe(401);
		});

		// it('should return 403 if user is not an admin', async () => {
		// 	const res = await exec();
		// 	expect(res.status).toBe(403);
		// });
	});
});

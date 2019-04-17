import 'babel-polyfill';
import request from 'supertest';
import mongoose from 'mongoose';
import { User } from '../../models/user';
import { app } from '../../index';

// //validate if user is logged in
describe('/api/roles', () => {
	it('should return 401 if user is not logged in', async () => {
		const res = await request(app)
			.post('/api/roles')
			.send({ name: 'hello1' });

		expect(res.status).toBe(401);
	});
});

import 'babel-polyfill';
import request from 'supertest';
import mongoose from 'mongoose';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { app } from '../../index';

// //validate if user is logged in
describe('Roles', () => {
	describe('POST ', () => {
		let token;
		let title;
		const exec = async () => {
			return await request(app)
				.post('/api/roles')
				.set('x-auth-token', token)
				.send({ title });
		};
		const user = {
			_id: mongoose.Types.ObjectId().toHexString(),
			role: {
				_id: mongoose.Types.ObjectId().toHexString(),
				title: 'Regular'
			}
		};
		beforeEach(() => {
			token = new User(user).generateAuthToken();
			title = 'Admin';
		});

		afterEach(async () => {
			await Role.remove({});
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

		it('should return 400 if category is less than 5 characters', async () => {
			user.role.title = 'Admin';
			token = new User(user).generateAuthToken();
			title = new Array(35).join('k');
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if role already exist', async () => {
			const roles = [{ title: 'Admin' }, { title: 'Regular' }];
			await Role.collection.insertMany(roles);
			const res = await exec();
			expect(res.status).toBe(400);
		});

		it('should validate Admin role exist', async () => {
			user.role.title = 'Admin';
			token = new User(user).generateAuthToken();
			const res = await exec();
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('title', 'Admin');
		});

		it('should validate Regular role exist', async () => {
			user.role.title = 'Admin';
			title = 'Regular';
			token = new User(user).generateAuthToken();
			const res = await exec();
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('title', 'Regular');
		});
	});
});

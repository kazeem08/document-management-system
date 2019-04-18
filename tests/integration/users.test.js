import 'babel-polyfill';
import request from 'supertest';
import mongoose from 'mongoose';
import { User } from '../../models/user';
import { app } from '../../index';

describe('Users', () => {
	describe('GET', () => {
		let token;
		const user = new User({
			firstName: 'Kazeem',
			lastName: 'lanre',
			userName: 'kazeem08',
			email: 'kazeem08@gmail.com',
			password: '123456',
			role: {
				_id: mongoose.Types.ObjectId().toHexString(),
				title: 'Regular'
			}
		});

		beforeEach(() => {
			token = new User(user).generateAuthToken();
		});

		afterEach(async () => {
			await User.deleteMany();
		});

		it('should return 401 if user is not logged in', async () => {
			token = '';
			const res = await request(app).get('/api/users');
			expect(res.status).toBe(401);
		});

		it('should return 403 if user is not an ADMIN', async () => {
			const res = await request(app)
				.get('/api/users')
				.set('x-auth-token', token);
			expect(res.status).toBe(403);
		});

		it('should get all users', async () => {
			user.role.title = 'Admin';
			token = new User(user).generateAuthToken();

			await user.save();
			const res = await request(app)
				.get('/api/users')
				.set('x-auth-token', token);

			expect(res.body.some(g => g.firstName === 'Kazeem')).toBeTruthy();
			expect(res.body.some(g => g.email === 'kazeem08@gmail.com')).toBeTruthy();
			expect(res.body).toBeDefined();
		});
	});

	describe('GET by ID', () => {
		let token;
		const user = new User({
			firstName: 'Kazeem',
			lastName: 'lanre',
			userName: 'kazeem08',
			email: 'kazeem08@gmail.com',
			password: '123456',
			role: {
				_id: mongoose.Types.ObjectId().toHexString(),
				title: 'Regular'
			}
		});

		beforeEach(() => {
			token = new User(user).generateAuthToken();
		});

		afterEach(async () => {
			await User.deleteMany();
		});
		it('should return 404 if id is invalid', async () => {
			const res = await request(app).get('/api/users/1');
			expect(res.status).toBe(404);
		});

		it('should return 401 if user is not logged in', async () => {
			token = '';
			const id = mongoose.Types.ObjectId();
			const res = await request(app).get('/api/users/' + id);
			expect(res.status).toBe(401);
		});

		it('should return 403 if user is not an admin', async () => {
			const id = mongoose.Types.ObjectId();
			const res = await request(app)
				.get('/api/users/' + id)
				.set('x-auth-token', token);
			expect(res.status).toBe(403);
		});

		it('should return 404 if no user exists with the ID', async () => {
			user.role.title = 'Admin';
			token = new User(user).generateAuthToken();
			const id = mongoose.Types.ObjectId();
			const res = await request(app)
				.get('/api/users/' + id)
				.set('x-auth-token', token);
			expect(res.status).toBe(404);
		});

		it('should return user if Id is valid', async () => {
			user.role.title = 'Admin';
			await user.save();
			token = new User(user).generateAuthToken();
			const res = await request(app)
				.get('/api/users/' + user._id)
				.set('x-auth-token', token);
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('email', 'kazeem08@gmail.com');
		});
	});

	describe('POST', () => {
		let token;
		const user = new User({
			firstName: 'Kazeem',
			lastName: 'lanre',
			userName: 'kazeem08',
			email: 'kazeem08@gmail.com',
			password: '123456',
			role: {
				_id: mongoose.Types.ObjectId().toHexString(),
				title: 'Regular'
			}
		});

		beforeEach(() => {
			token = new User(user).generateAuthToken();
		});

		afterEach(async () => {
			await User.deleteMany();
		});

		it('should return 401 if user is not logged in', async () => {
			token = '';
			const res = await request(app).post('/api/users');
			expect(res.status).toBe(401);
		});
	});
});

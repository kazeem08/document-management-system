const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');
const roleModel = require('../../models/role');
const userModel = require('../../models/user');

describe('Users', () => {
	describe('GET', () => {
		let token;
		const user = new userModel.User({
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
			token = new userModel.User(user).generateAuthToken();
		});

		afterEach(async () => {
			await userModel.User.deleteMany();
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
			token = new userModel.User(user).generateAuthToken();

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
		const user = new userModel.User({
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
			token = new userModel.User(user).generateAuthToken();
		});

		afterEach(async () => {
			await userModel.User.deleteMany();
		});
		it('should return 404 if id is invalid', async () => {
			const res = await request(app).get('/api/users/1');
			expect(res.status).toBe(404);
		});

		it('should return 401 if user is not logged in', async () => {
			token = '';
			const res = await request(app).get('/api/users/me');
			expect(res.status).toBe(401);
		});

		// it('should return 403 if user is not an admin', async () => {
		// 	const res = await request(app)
		// 		.get('/api/users/me')
		// 		.set('x-auth-token', token);
		// 	expect(res.status).toBe(403);
		// });

		it('should return user if Id is valid', async () => {
			await user.save();
			token = new userModel.User(user).generateAuthToken();
			const res = await request(app)
				.get('/api/users/me')
				.set('x-auth-token', token);
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('email', 'kazeem08@gmail.com');
		});
	});

	describe('POST', () => {
		beforeEach(() => {});

		afterEach(async () => {
			await userModel.User.deleteMany();
			await roleModel.Role.deleteMany();
		});

		it('should return req.body validation fails', async () => {
			const newUser = {
				firstName: 'Kafffff',
				lastName: 'lanre',
				email: 'kazeem08@gmail.com',
				password: '123456',
				roleId: mongoose.Types.ObjectId()
			};

			const res = await request(app)
				.post('/api/users')
				.send(newUser);
			expect(res.status).toBe(400);
		});

		it('should return 400 if user already exists', async () => {
			const newUser = new userModel.User({
				firstName: 'Kazeem',
				lastName: 'lanre',
				userName: 'kazeem08',
				email: 'kazeem08@gmail.com',
				password: '123456',
				role: {
					_id: mongoose.Types.ObjectId(),
					title: 'level2'
				}
			});

			await newUser.save();

			const role = new roleModel.Role({
				_id: mongoose.Types.ObjectId(),
				title: 'leve1'
			});

			await role.save();

			const user2 = {
				firstName: 'Kazeem',
				lastName: 'lanre',
				userName: 'kazeem08',
				email: 'kazeem08@gmail.com',
				password: '123456',
				roleId: role._id
			};

			const res = await request(app)
				.post('/api/users')
				.send(user2);
			expect(res.status).toBe(400);
		});

		it('should return 400 if roleId is invalid', async () => {
			const newUser = {
				firstName: 'Kazeem',
				lastName: 'lanre',
				userName: 'fsfsffsf',
				email: 'kdgdfdtd@gmail.com',
				password: '123456',
				roleId: mongoose.Types.ObjectId()
			};

			const res = await request(app)
				.post('/api/users')
				.send(newUser);
			expect(res.status).toBe(400);
		});

		it('should create new user', async () => {
			const role = new roleModel.Role({
				_id: mongoose.Types.ObjectId(),
				title: 'leve1'
			});

			await role.save();
			const newUser = {
				firstName: 'Kazeem',
				lastName: 'lanre',
				userName: 'kazeem08',
				email: 'kaz08@gmail.com',
				password: '123456',
				roleId: role._id
			};

			const res = await request(app)
				.post('/api/users')
				.send(newUser);
			expect(res.status).toBe(200);
		});
	});

	describe('PUT', () => {
		let token;
		const user = new userModel.User({
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

		beforeEach(() => {
			token = new userModel.User(user).generateAuthToken();
		});

		afterEach(async () => {
			await userModel.User.deleteMany();
			await roleModel.Role.deleteMany();
		});
		it('should return 401 if user is not logged in', async () => {
			const res = await request(app).put('/api/users/me');
			expect(res.status).toBe(401);
		});

		it('should update user', async () => {
			await user.save();

			const res = await request(app)
				.put('/api/users/me')
				.set('x-auth-token', token)
				.send({ firstName: 'Olanrewaju' });

			const updatedUser = await userModel.User.findById(user._id);
			expect(res.status).toBe(200);
			expect(updatedUser.firstName).toBe('Olanrewaju');
		});
	});

	describe('DELETE', () => {
		let token;
		const user = new userModel.User({
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

		beforeEach(() => {
			token = new userModel.User(user).generateAuthToken();
		});

		afterEach(async () => {
			await userModel.User.deleteMany();
			await roleModel.Role.deleteMany();
		});

		it('should return 401 if user is not logged in', async () => {
			const res = await request(app).delete('/api/users/me');
			expect(res.status).toBe(401);
		});

		it('should delete user', async () => {
			await user.save();

			const res = await request(app)
				.delete('/api/users/me')
				.set('x-auth-token', token);
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
		});
	});
});

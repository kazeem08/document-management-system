const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');
const roleModel = require('../../models/role');
const userModel = require('../../models/user');

describe('Roles', () => {
	describe('GET', () => {
		let token;
		const user = {
			_id: mongoose.Types.ObjectId().toHexString(),
			role: {
				_id: mongoose.Types.ObjectId().toHexString(),
				title: 'Admin'
			}
		};
		beforeEach(() => {
			token = new userModel.User(user).generateAuthToken();
		});

		afterEach(async () => {
			await roleModel.Role.deleteMany({});
		});

		it('should get all roles if user is logged in as an admin', async () => {
			// const role = new Role({
			// 	title: 'Admin'
			// });

			const role = { title: 'Admin' };
			await roleModel.Role.create(role);
			// await role.save();

			const res = await request(app)
				.get('/api/roles')
				.set('x-auth-token', token);
			expect(res.status).toBe(200);
			// expect(res.body.length).toBe(1);
			expect(res.body.some(g => g.title === 'Admin')).toBeTruthy();
		});
	});

	describe('GET by ID', () => {
		let token;
		const user = {
			_id: mongoose.Types.ObjectId().toHexString(),
			role: {
				_id: mongoose.Types.ObjectId().toHexString(),
				title: 'Admin'
			}
		};
		beforeEach(() => {
			token = new userModel.User(user).generateAuthToken();
		});

		afterEach(async () => {
			await roleModel.Role.deleteMany({});
		});

		it('should return 400 if no role is found', async () => {
			const id = mongoose.Types.ObjectId();
			const res = await request(app)
				.get('/api/roles/' + id)
				.set('x-auth-token', token);
			expect(res.status).toBe(404);
		});

		it('should return a role if a valid id is passed ', async () => {
			const role = new roleModel.Role({
				name: 'Regular'
			});

			await role.save();
			const res = await request(app)
				.get('/api/roles/' + role._id)
				.set('x-auth-token', token);
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('name', role.name);
		});

		it('should return error if id is invalid', async () => {
			const res = await request(app).get('/api/roles/1');
			expect(res.status).toBe(404);
		});
	});

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
			token = new userModel.User(user).generateAuthToken();
			title = 'Admin';
		});

		afterEach(async () => {
			await roleModel.Role.remove({});
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

		it('should return 400 if role is less than 5 characters', async () => {
			user.role.title = 'Admin';
			token = new userModel.User(user).generateAuthToken();
			title = 'fff';
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if role is more than 30 characters', async () => {
			user.role.title = 'Admin';
			token = new userModel.User(user).generateAuthToken();
			title = new Array(35).join('k');
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if role already exist', async () => {
			const roles = [{ title: 'Admin' }, { title: 'Regular' }];
			await roleModel.Role.collection.insertMany(roles);
			const res = await exec();
			expect(res.status).toBe(400);
		});

		it('should validate Admin role exist', async () => {
			user.role.title = 'Admin';
			token = new userModel.User(user).generateAuthToken();
			const res = await exec();
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('title', 'Admin');
		});

		it('should validate Regular role exist', async () => {
			user.role.title = 'Admin';
			title = 'Regular';
			token = new userModel.User(user).generateAuthToken();
			const res = await exec();
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('title', 'Regular');
		});
	});

	describe('PUT', () => {
		let token;
		let title;
		let id;
		const exec = async () => {
			return await request(app)
				.put('/api/roles/' + id)
				.set('x-auth-token', token)
				.send({ title });
		};
		const user = {
			_id: mongoose.Types.ObjectId(),
			role: {
				_id: mongoose.Types.ObjectId(),
				title: 'staff'
			}
		};
		beforeEach(() => {
			token = new userModel.User(user).generateAuthToken();
			id = mongoose.Types.ObjectId();
			title = 'Regular';
		});

		afterEach(async () => {
			await roleModel.Role.deleteMany({});
			await userModel.User.deleteMany();
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

		it('should return 404 if ID is invalid', async () => {
			id = 1;
			const res = await exec();
			expect(res.status).toBe(404);
		});

		it('should return 400 if role is less than 5 characters', async () => {
			user.role.title = 'Admin';
			token = new userModel.User(user).generateAuthToken();
			title = 'nn';
			const res = await exec();
			expect(res.status).toBe(400);
		});

		it('should return 400 if role is more than 30 characters', async () => {
			user.role.title = 'Admin';
			token = new userModel.User(user).generateAuthToken();
			title = new Array(35).join('k');
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 404 if role does not exist', async () => {
			user.role.title = 'Admin';
			title = 'hfjfyk';
			token = new userModel.User(user).generateAuthToken();
			const res = await exec();

			expect(res.status).toBe(404);
		});

		it('should update role if found', async () => {
			const role = new roleModel.Role({
				title: 'role1'
			});
			await role.save();
			user.role.title = 'Admin';
			token = new userModel.User(user).generateAuthToken();
			const res = await request(app)
				.put('/api/roles/' + role._id)
				.set('x-auth-token', token)
				.send({ title: 'role2' });
			const updatedRole = await roleModel.Role.findById(role._id);

			expect(updatedRole.title).toBe('role2');
		});
	});

	describe('DELETE', () => {
		let token;
		let title;
		let id;
		const exec = async () => {
			return await request(app)
				.delete('/api/roles/' + id)
				.set('x-auth-token', token)
				.send({ title });
		};
		const user = {
			_id: mongoose.Types.ObjectId(),
			role: {
				_id: mongoose.Types.ObjectId(),
				title: 'Admin'
			}
		};
		beforeEach(() => {
			token = new userModel.User(user).generateAuthToken();
			id = mongoose.Types.ObjectId();
			title = 'Regular';
		});

		afterEach(async () => {
			await roleModel.Role.deleteMany({});
			await userModel.User.deleteMany();
		});

		it('should return 401 if user is not logged in', async () => {
			token = '';

			const res = await exec();
			expect(res.status).toBe(401);
		});

		it('should return 403 if user is not an admin', async () => {
			user.role.title = 'staff';
			token = new userModel.User(user).generateAuthToken();
			const res = await exec();
			expect(res.status).toBe(403);
		});

		it('should return 404 if ID is invalid', async () => {
			id = 1;
			const res = await exec();
			expect(res.status).toBe(404);
		});

		it('should return 404 if role does not exist', async () => {
			user.role.title = 'Admin';
			token = new userModel.User(user).generateAuthToken();
			const res = await exec();

			expect(res.status).toBe(404);
		});

		it('should delete role if found', async () => {
			const role = new roleModel.Role({
				title: 'role1'
			});
			await role.save();
			user.role.title = 'Admin';
			token = new userModel.User(user).generateAuthToken();
			id = role._id;
			const res = await exec();
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
		});
	});
});

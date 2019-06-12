const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');
const userModel = require('../../models/user');

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
		token = new userModel.User(user).generateAuthToken();
	});

	afterEach(async () => {
		await userModel.User.deleteMany();
	});

	it('should log user out', async () => {
		const res = await request(app)
			.post('/api/logout')
			.set('x-auth-token', token);

		expect(res.body).toBeDefined();
	});
});

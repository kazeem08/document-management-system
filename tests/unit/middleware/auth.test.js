const mongoose = require('mongoose');
const auth = require('../../../middleware/auth');
const userModel = require('../../models/user');

describe('auth middleware', () => {
	it('it should populate req.user with the payload of a valid JWT', () => {
		const user = {
			_id: mongoose.Types.ObjectId().toHexString(),
			role: {
				_id: mongoose.Types.ObjectId().toHexString(),
				title: 'Regular'
			}
		};
		const token = new userModel.User(user).generateAuthToken();

		const req = {
			header: jest.fn().mockReturnValue(token)
		};
		const res = {};
		const next = jest.fn();

		auth(req, res, next);
		expect(req.user).toMatchObject(user);
	});
});

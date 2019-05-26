import 'babel-polyfill';
import mongoose from 'mongoose';
import { User } from '../../../models/user';
import { auth } from '../../../middleware/auth';

describe('auth middleware', () => {
	it('it should populate req.user with the payload of a valid JWT', () => {
		const user = {
			_id: mongoose.Types.ObjectId().toHexString(),
			role: {
				_id: mongoose.Types.ObjectId().toHexString(),
				title: 'Regular'
			}
		};
		const token = new User(user).generateAuthToken();

		const req = {
			header: jest.fn().mockReturnValue(token)
		};
		const res = {};
		const next = jest.fn();

		auth(req, res, next);
		expect(req.user).toMatchObject(user);
	});
});

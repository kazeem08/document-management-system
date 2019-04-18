// import 'babel-polyfill';

// import mongoose from 'mongoose';
// import { User } from '../../../models/user';
// import { admin } from '../../../middleware/admin';
// import { Role } from '../../../models/role';

// describe('admin validation', () => {
// 	it('should return 403 if user is not an admin', () => {
// 		const user = {
// 			_id: mongoose.Types.ObjectId().toHexString(),
// 			role: {
// 				_id: mongoose.Types.ObjectId().toHexString(),
// 				title: 'Regular'
// 			}
// 		};
// 		const req = { user };
// 		// const token = new User(user).generateAuthToken();

// 		const res = {};
// 		const next = jest.fn();
// 		admin(req, res, next);
// 		expect(res.status).toBe(403);
// 	});
// });

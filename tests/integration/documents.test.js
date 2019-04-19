import 'babel-polyfill';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../index';
import { User } from '../../models/user';
import { Document } from '../../models/document';

describe('Documents', () => {
	let token;
	beforeEach(() => {
		token = new User(user).generateAuthToken();
	});
	afterEach(async () => {
		await User.deleteMany();
		await Document.deleteMany();
	});

	const user = new User({
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

	it('should return 401 if user is not logged in', async () => {
		token = '';
		const document = {
			title: 'document1',
			userId: user._id,
			content: 'welcome to first document',
			access: 'public'
		};
		const res = await request(app)
			.post('/api/documents')
			.send(document);
		expect(res.status).toBe(401);
	});
	it('should have a dateCreated property', async () => {
		const user = new User({
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

		await user.save();

		const document = {
			title: 'document1',
			userId: user._id,
			content: 'welcome to first document',
			access: 'public'
		};

		const res = await request(app)
			.post('/api/documents')
			.send(document)
			.set('x-auth-token', token);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('dateCreated');
	});
});

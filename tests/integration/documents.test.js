import 'babel-polyfill';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../index';
import { User } from '../../models/user';
import { Document } from '../../models/document';

describe('Documents', () => {
	afterEach(async () => {
		await User.deleteMany();
		await Document.deleteMany();
	});
	it('should return documents according to conditions provided', async () => {
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
			.send(document);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('dateCreated');
	});
});

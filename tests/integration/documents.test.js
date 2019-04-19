import 'babel-polyfill';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../index';
import { User } from '../../models/user';
import { Document } from '../../models/document';

describe('Documents', () => {
	describe('GET', () => {
		let token;
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

		beforeEach(() => {
			token = new User(user).generateAuthToken();
		});
		afterEach(async () => {
			await User.deleteMany();
			await Document.deleteMany();
		});

		it('should return 400 if user is not the creator of the document', async () => {
			const document = new Document({
				title: 'document1',
				user: user,
				content: 'welcome to first document',
				access: 'private'
			});
			await document.save();

			const res = await request(app)
				.get('/api/documents/private')
				.set('x-auth-token', token);

			expect(res.body.some(g => g.access === 'private')).toBeTruthy();
		});
	});

	describe('POST', () => {
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
		let token;
		beforeEach(() => {
			token = new User(user).generateAuthToken();
		});
		afterEach(async () => {
			await User.deleteMany();
			await Document.deleteMany();
		});

		it('should return 401 if user is not logged in', async () => {
			token = '';

			const res = await request(app)
				.post('/api/documents')
				.send({ content: 'hello world' });
			expect(res.status).toBe(401);
		});
		it('should have a dateCreated property', async () => {
			await user.save();

			const document = {
				title: 'document1',
				userId: user._id,
				content: 'welcome to first document'
			};

			const res = await request(app)
				.post('/api/documents')
				.send(document)
				.set('x-auth-token', token);
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('dateCreated');
			expect(res.body).toHaveProperty('access', 'public');
		});
	});
});

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

		const user2 = new User({
			firstName: 'Kazeem',
			lastName: 'lanre',
			userName: 'kazem08',
			email: 'kazee8@gmail.com',
			password: '123456',
			role: {
				_id: mongoose.Types.ObjectId(),
				title: 'Admin'
			}
		});

		beforeEach(() => {
			token = new User(user).generateAuthToken();
		});
		afterEach(async () => {
			await User.deleteMany();
			await Document.deleteMany();
		});

		it('should return invalid token', async () => {
			token = '1234';
			const res = await request(app)
				.get('/api/documents')
				.set('x-auth-token', token);

			expect(res.status).toBe(400);
		});

		it('should return all files if user is an admin', async () => {
			const document = new Document({
				title: 'document1',
				user: user2,
				content: 'welcome to first document',
				access: 'role'
			});
			await document.save();

			token = new User(user2).generateAuthToken();
			const res = await request(app)
				.get('/api/documents?page=1')
				.set('x-auth-token', token);

			expect(res.body).toBeDefined();
		});

		it('should return all files with filtered conditions', async () => {
			const document = new Document({
				title: 'document1',
				user: user,
				content: 'welcome to first document',
				access: 'role'
			});
			await document.save();

			token = new User(user).generateAuthToken();
			const res = await request(app)
				.get('/api/documents?page=1')
				.set('x-auth-token', token);

			expect(res.body).toBeDefined();
		});

		// it('should return all files with filtered conditions', async () => {
		// 	const document = new Document({
		// 		title: 'document1',
		// 		user: user,
		// 		content: 'welcome to first document',
		// 		access: 'role'
		// 	});
		// 	await document.save();

		// 	token = new User(user).generateAuthToken();
		// 	const res = await request(app)
		// 		.get('/api/documents/page')
		// 		.set('x-auth-token', token);

		// 	expect(res.body).toBeDefined();
		// });

		// it('should return all files with filtered conditions', async () => {
		// 	token = new User(user).generateAuthToken();
		// 	const res = await request(app)
		// 		.get('/api/documents/page')
		// 		.set('x-auth-token', token);

		// 	expect(res.status).toBe(404);
		// });

		it('should return 404 if user is not the creator of the document', async () => {
			const document = new Document({
				title: 'document1',
				user: user,
				content: 'welcome to first document',
				access: 'private'
			});
			await document.save();

			token = new User(user2).generateAuthToken();

			const res = await request(app)
				.get('/api/documents/private')
				.set('x-auth-token', token);

			expect(res.status).toBe(404);
		});

		it('should return record if user is  the creator of the document', async () => {
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
			// expect(res.status).toBe(404);
		});

		it('should return 404 if user is not on the same role when accessing documents that have acess as role', async () => {
			const document = new Document({
				title: 'document1',
				user: user,
				content: 'welcome to first document',
				access: 'role'
			});
			await document.save();

			token = new User(user2).generateAuthToken();
			const res = await request(app)
				.get('/api/documents/role')
				.set('x-auth-token', token);

			expect(res.status).toBe(404);
		});

		it('should return the record if user is on the same role', async () => {
			const document = new Document({
				title: 'document1',
				user: user,
				content: 'welcome to first document',
				access: 'role'
			});
			await document.save();

			token = new User(user).generateAuthToken();
			const res = await request(app)
				.get('/api/documents/role')
				.set('x-auth-token', token);

			expect(res.status).toBeDefined();
		});

		it('should return all files with filtered conditions', async () => {
			const document = new Document({
				title: 'document1',
				user: user,
				content: 'welcome to first document',
				access: 'role'
			});
			// await document.save();

			token = new User(user2).generateAuthToken();
			const res = await request(app)
				.get('/api/documents')
				.set('x-auth-token', token);

			expect(res.status).toBe(404);
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
			await User.deleteMany({});
			await Document.deleteMany();
		});

		it('should return 401 if user is not logged in', async () => {
			token = '';

			const res = await request(app)
				.post('/api/documents')
				.send({ content: 'hello world' });
			expect(res.status).toBe(401);
		});

		it('should return 400 if input validation fails', async () => {
			const document = {
				title: 'g1',
				userId: mongoose.Types.ObjectId(),
				content: 'wt'
			};

			const res = await request(app)
				.post('/api/documents')
				.send(document)
				.set('x-auth-token', token);

			expect(res.status).toBe(400);
		});

		it('should return 400 if user does not exist', async () => {
			const document = {
				title: 'document1',
				userId: mongoose.Types.ObjectId(),
				content: 'welcome to first document'
			};

			const res = await request(app)
				.post('/api/documents')
				.send(document)
				.set('x-auth-token', token);

			expect(res.status).toBe(400);
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

	describe('PUT', () => {
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

		const document = new Document({
			title: 'document1',
			user: user,
			content: 'welcome to first document',
			access: 'private'
		});

		beforeEach(() => {
			token = new User(user).generateAuthToken();
		});
		afterEach(async () => {
			await User.deleteMany();
			await Document.deleteMany();
		});

		it('should return 401 if user is not logged in', async () => {
			const id = mongoose.Types.ObjectId();
			const res = await request(app).put('/api/documents/' + id);
			expect(res.status).toBe(401);
		});

		it('should return 404 if ID is invalid', async () => {
			const id = 1;
			const res = await request(app)
				.put('/api/documents/' + id)
				.set('x-auth-token', token);
			expect(res.status).toBe(404);
		});

		it('should return 404 if ID of user does not exist', async () => {
			const id = mongoose.Types.ObjectId();
			const res = await request(app)
				.put('/api/documents/' + id)
				.set('x-auth-token', token);
			expect(res.status).toBe(404);
		});

		it('should update if user id is valid', async () => {
			await document.save();

			const res = await request(app)
				.put('/api/documents/' + document._id)
				.set('x-auth-token', token)
				.send({ title: 'document2' });

			const updatedUser = await Document.findById(document._id);
			expect(res.status).toBe(200);
			expect(updatedUser.title).toBe('document2');
		});

		describe('DELETE', () => {
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

			const document = new Document({
				title: 'document1',
				user: user,
				content: 'welcome to first document',
				access: 'private'
			});

			beforeEach(() => {
				token = new User(user).generateAuthToken();
			});
			afterEach(async () => {
				await User.deleteMany();
				await Document.deleteMany();
			});

			it('should return 404 if ID is invalid', async () => {
				const id = 1;
				const res = await request(app)
					.delete('/api/documents/' + id)
					.set('x-auth-token', token);
				expect(res.status).toBe(404);
			});

			it('should return 401 if user is not logged in', async () => {
				const id = mongoose.Types.ObjectId();
				const res = await request(app).delete('/api/documents/' + id);
				expect(res.status).toBe(401);
			});

			it('should return 404 if document does not exist', async () => {
				const id = mongoose.Types.ObjectId();
				const res = await request(app)
					.delete('/api/documents/' + id)
					.set('x-auth-token', token);
				expect(res.status).toBe(404);
			});

			it('should delete document', async () => {
				await document.save();

				const res = await request(app)
					.delete('/api/documents/' + document._id)
					.set('x-auth-token', token);
				expect(res.status).toBe(200);
				expect(res.body).toHaveProperty('_id');
			});
		});
	});
});

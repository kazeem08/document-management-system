import express from 'express';
import { User } from './models/user';
import { Role } from './models/role';
import { Document } from './models/document';
import faker from 'faker';
import bcrypt from 'bcrypt';

const app = express();

const port = process.env.PORT; //getting the port

import './startup/db';

app.listen(port, () => console.log(`listening on port ${port}...`));

class Seeder {
	async seedUsers() {
		let role = await Role.findOne({ title: 'Admin' });
		let role2 = await Role.findOne({ title: 'Regular' });

		for (let i = 0; i < 20; i++) {
			let user = {};
			if (i > 2) {
				user.role = { _id: role._id, title: role.title };
			} else {
				user.role = { _id: role2._id, title: role2.title };
			}
			user.firstName = faker.name.firstName();
			user.lastName = faker.name.lastName();
			user.userName = faker.internet.userName();
			user.email = faker.internet.email();
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash('123456', salt);
			const user1 = await User.create(user);
			//await user1.save();
		}
	}

	async seedDocuments() {
		let access = ['private', 'public', 'role'];

		for (let i = 0; i < 10; i++) {
			const users = await User.find();
			let document = {};
			document.title = faker.company.companyName();
			let user = users[Math.floor(Math.random() * users.length)];
			document.user = {
				_id: user._id,
				firstName: user.firstName,
				role: {
					_id: user.role._id,
					title: user.role.title
				}
			};
			document.access = access[Math.floor(Math.random() * access.length)];
			document.content = faker.lorem.sentence();

			await Document.create(document);
		}
	}
}

const seed = new Seeder();
const seeding = async function() {
	await seed.seedUsers();
	await seed.seedDocuments();
};
// seed.seedDocuments();
seeding();

export { seed };

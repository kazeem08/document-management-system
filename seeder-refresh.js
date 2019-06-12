const userModel = require('./models/user');
const roleModel = require('./models/role');
const doc = require('./models/document');
const faker = require('faker');
const bcrypt = require('bcrypt');

const app = express();

const port = process.env.PORT; //getting the port

require('./startup/db');

app.listen(port, () => console.log(`listening on port ${port}...`));

class Seeder {
	async seedUsers() {
		await userModel.User.deleteMany();
		let role = await roleModel.Role.findOne({ title: 'Admin' });
		let role2 = await roleModel.Role.findOne({ title: 'Regular' });
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
			const user1 = await userModel.User.create(user);
			//await user1.save();
		}
	}
	async seedDocuments() {
		await doc.Document.deleteMany();
		let access = ['private', 'public', 'role'];
		for (let i = 0; i < 10; i++) {
			const users = await userModel.User.find();
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
			await doc.Document.create(document);
		}
	}
}

const seed = new Seeder();
async function seeding() {
	await seed.seedUsers();
	await seed.seedDocuments();
}

seeding();

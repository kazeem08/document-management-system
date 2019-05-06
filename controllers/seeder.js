import _ from 'lodash';
import faker from 'faker';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { Role } from '../models/role';

//method for creating user
class UserController {
	async fakeUsers(req, res) {
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
			console.log(user1);
			//await user1.save();
		}

		res.send('done');
	}
}

const userController = new UserController();

export { userController };

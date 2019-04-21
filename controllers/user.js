import { User } from '../models/user';

class UserController {
	constructor() {}
	async getAllUsers(req, res) {
		const users = await User.find();
		res.send(users);
	}
}

const userController = new UserController();

// const UserConttroller = {};

// UserConttroller.get = async (req, res) => {
// 	const users = await User.find();
// 	res.send(users);
// };

export { userController };

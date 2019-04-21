import { User } from '../models/user';

class UserController {
	constructor() {}
	async getAllUsers(req, res) {
		const users = await User.find();
		res.send(users);
	}

	async getById(req, res) {
		const user = await User.findById(req.params.id);
		if (!user) return res.status(404).send('No user exist with this ID');
		res.send(user);
	}
}

const userController = new UserController();

// const UserConttroller = {};

// UserConttroller.get = async (req, res) => {
// 	const users = await User.find();
// 	res.send(users);
// };

export { userController };

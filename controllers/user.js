import _ from 'lodash';
import bcrypt from 'bcrypt';
import { User, validateUser } from '../models/user';
import { Role } from '../models/role';

//method for creating user
class UserController {
	async getAllUsers(req, res) {
		const users = await User.find();
		res.send(users);
	}

	//method for getting user by Id
	async getById(req, res) {
		const user = await User.findById(req.user._id);
		res.send(user);
	}

	//method for creating user
	async createUser(req, res) {
		const { error } = validateUser(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		let user = await User.findOne({ email: req.body.email });
		if (user) return res.status(400).send('user already exist');

		let role = await Role.findById(req.body.roleId);
		if (!role) return res.status(400).send('Invalid role Id');

		user = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			userName: req.body.userName,
			email: req.body.email,
			password: req.body.password,
			role: {
				_id: role._id,
				title: role.title
			}
		});

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);

		await user.save();

		// res.send(user);
		res.send(
			_.pick(user, ['_id', 'firstName', 'lastName', 'userName', 'email'])
		);
	}

	//method for updating user
	async updateUser(req, res) {
		let user = await User.findByIdAndUpdate(
			req.user._id,
			{
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				userName: req.body.userName,
				email: req.body.email,
				password: req.body.password,
				role: {
					_id: req.user.role._id,
					title: req.user.role.title
				}
			},
			{ new: true }
		);

		res.send(user);
	}

	//method for deleting user
	async deleteUser(req, res) {
		let user = await User.findByIdAndDelete(req.user._id);

		res.send(user);
	}
}

const userController = new UserController();

export { userController };

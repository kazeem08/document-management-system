import express from 'express';
import { User, validateUser } from '../models/user';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';
import { validateObjectId } from '../middleware/validateObjectId';
import { Role } from '../models/role';

const router = express.Router();

//routet to get all users
router.get('/', [auth, admin], async (req, res) => {
	const users = await User.find();
	res.send(users);
});

//route to get user by Id
router.get('/:id', validateObjectId, [auth, admin], async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) return res.status(404).send('No user exist with this ID');
	res.send(user);
});

//route to create user
router.post('/', async (req, res) => {
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

	await user.save();

	res.send(user);
});

//route to update user
router.put('/:id', validateObjectId, auth, async (req, res) => {
	let user = await User.findById(req.params.id);
	if (!user) return res.status(404).send('User does not exist');

	user = await User.findByIdAndUpdate(
		req.params.id,
		{
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			userName: req.body.userName,
			email: req.body.email,
			password: req.body.password,
			role: {
				_id: user.role._id,
				title: user.role.title
			}
		},
		{ new: true }
	);

	res.send(user);
});

//route to delete
router.delete('/:id', validateObjectId, auth, async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) return res.status(404).send('User does not exist');
	res.send();
});

export { router as users };

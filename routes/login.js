import express from 'express';
import Joi from 'joi';
import { auth } from '../middleware/auth';
import { User } from '../models/user';

const router = express.Router();

//route to log in
router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email or password');

	if (user.password !== req.body.password)
		return res.status(400).send('Invalid email/password');

	res.send();
});

function validate(req) {
	const schema = {
		email: Joi.string()
			.min(7)
			.max(200)
			.required()
			.email(),
		password: Joi.string()
			.min(5)
			.max(255)
			.required()
	};
	return Joi.validate(req, schema);
}

export { router as login };

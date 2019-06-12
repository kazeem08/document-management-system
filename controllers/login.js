const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const login1 = require('../routes/login');
const Joi = require('@hapi/joi');

class LoginController {
	//method for logging in
	async login(req, res) {
		const { error } = validateLogin(req.body);

		if (error) return res.status(400).send(error.details[0].message);

		const user = await userModel.User.findOne({ email: req.body.email });
		if (!user) return res.status(400).send('Invalid email or password');

		const password = await bcrypt.compare(req.body.password, user.password);
		if (!password) return res.status(400).send('Invalid email/password');

		const token = user.generateAuthToken();
		res.send({ token: token });
	}
}

//joi validation for login
function validateLogin(req) {
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

const loginController = new LoginController();

module.exports = loginController;

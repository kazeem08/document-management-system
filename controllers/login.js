const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const validate = require('../routes/login');

class LoginController {
	//method for logging in
	async login(req, res) {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const user = await userModel.User.findOne({ email: req.body.email });
		if (!user) return res.status(400).send('Invalid email or password');

		const password = await bcrypt.compare(req.body.password, user.password);
		if (!password) return res.status(400).send('Invalid email/password');

		const token = user.generateAuthToken();
		res.send({ token: token });
	}
}

const loginController = new LoginController();

module.exports = loginController;

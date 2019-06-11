import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { validate } from '../routes/login';

class LoginController {
	//method for logging in
	async login(req, res) {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(400).send('Invalid email or password');

		const password = await bcrypt.compare(req.body.password, user.password);
		if (!password) return res.status(400).send('Invalid email/password');

		const token = user.generateAuthToken();
		res.send({ token: token });
	}
}

const loginController = new LoginController();

export { loginController };

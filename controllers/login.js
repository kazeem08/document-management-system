import { User } from '../models/user';
import { validate } from '../routes/login';

class LoginController {
	async login(req, res) {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(400).send('Invalid email or password');

		if (user.password !== req.body.password)
			return res.status(400).send('Invalid email/password');
		const token = user.generateAuthToken();
		res.send(token);
	}
}

const loginController = new LoginController();

export { loginController };

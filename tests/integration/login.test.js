import 'babel-polyfill';
import { User } from '../../models/user';

describe('Login', () => {
	it('shoud if email and password are provided', () => {});
});

function validate(req) {
	const schema = {
		email: Joi.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: Joi.string()
			.min(5)
			.max(255)
			.required()
	};
	return Joi.validate(req, schema);
import express from 'express';
import Joi from '@hapi/joi';
import { loginController } from '../controllers/login';

const router = express.Router();

//route to log in
router.post('/', loginController.login);

//joi validation for login
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

export { router as login, validate };

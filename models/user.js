import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { roleSchema } from './role';
import dotenv from 'dotenv';
dotenv.config();

//creating user schema
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 100
	},
	lastName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 100
	},
	userName: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
		maxlength: 100
	},
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: 7,
		maxlength: 200,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 200
	},
	role: {
		type: roleSchema,
		required: true
	}
});

//getting the jwt key from the environment
const jwtKey = process.env.jwtPrivateKey;

//generating jwt authentication key
userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this._id, role: this.role }, jwtKey);
	return token;
};

//creating user model
const User = mongoose.model('User', userSchema);

//joi validation for role model
function validateUser(user) {
	const schema = {
		firstName: Joi.string()
			.min(3)
			.max(100)
			.required(),
		lastName: Joi.string()
			.min(3)
			.max(100)
			.required(),
		username: Joi.string()
			.min(3)
			.max(100)
			.required(),
		email: Joi.string()
			.min(7)
			.max(200)
			.required()
			.email(),
		password: Joi.string().min(6),
		roleId: Joi.string().required()
	};

	return validate(user, schema);
}

export { User, validateUser };

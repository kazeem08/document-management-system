import mongoose from 'mongoose';

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
	username: {
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
	}
});

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
		password: Joi.string()
			.min(6)
			.max(200)
	};

	return validate(user, schema);
}

export { User, validateUser };

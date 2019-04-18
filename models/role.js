import mongoose from 'mongoose';
import Joi from 'joi';

//creating roleSchema
const roleSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
		minlength: 5,
		maxlength: 30
	}
});

//creating Role model
const Role = mongoose.model('Role', roleSchema);

//joi validation for role model
function validateRole(role) {
	const schema = {
		title: Joi.string()
			.min(5)
			.max(30)
			.required()
	};

	return Joi.validate(role, schema);
}

export { Role, validateRole, roleSchema };

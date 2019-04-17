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
		title: Joi.string().required()
	};

	return validate(role, schema);
}

export { Role, validateRole };

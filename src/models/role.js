import mongoose from 'mongoose';
import Joi from '@hapi/joi';

//creating roleSchema
const roleSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
		minlength: 5,
		maxlength: 30,
		default: 'Regular'
	}
});

//creating Role model
const Role = mongoose.model('Role', roleSchema);

const roles = Role.find();
if (roles.length < 1) {
	Role.insertMany([{ title: 'Admin' }, { title: 'Regular' }])
		.then(() => {})
		.catch(err => {});
}

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

import mongoose from 'mongoose';
import { roleSchema } from '../models/role';
import Joi from '@hapi/joi';

//creating custom user schema
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 100
	},
	role: {
		type: roleSchema,
		required: true
	}
});

//creating document schema
const documentSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			minlength: 5,
			max: 200
		},
		user: {
			type: userSchema,
			required: true
		},
		access: {
			type: String,
			default: 'public',
			minlength: 3,
			maxlength: 20
		},
		content: {
			type: String,
			required: true,
			minlength: 10,
			maxlength: 1000
		}
	},
	{ timestamps: true }
);

//creating document model
const Document = mongoose.model('Document', documentSchema);

// Joi validation for document schema
function validateDocument(document) {
	const schema = {
		title: Joi.string()
			.min(5)
			.max(200)
			.required(),
		access: Joi.string()
			.min(5)
			.max(20),
		content: Joi.string()
			.min(10)
			.max(1000)
			.required()
	};

	return Joi.validate(document, schema);
}

export { Document, documentSchema, validateDocument };
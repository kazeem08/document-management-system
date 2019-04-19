import mongoose from 'mongoose';
import { roleSchema } from '../models/role';

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

const documentSchema = new mongoose.Schema({
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
		default: 'public'
	},
	content: {
		type: String,
		required: true,
		minlength: 10,
		maxlength: 1000
	},
	dateCreated: {
		type: Date,
		default: Date.now
	},
	dateModified: {
		type: Date,
		default: Date.now
	}
});

const Document = mongoose.model('Document', documentSchema);

export { Document, userSchema };

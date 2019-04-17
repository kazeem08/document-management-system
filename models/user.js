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
	}
});

const User = mongoose.model('User', userSchema);

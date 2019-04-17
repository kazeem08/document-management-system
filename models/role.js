import mongoose from 'mongoose';

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

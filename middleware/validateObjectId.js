import mongoose from 'mongoose';

//Validating object Id in the endpoint
function validateObjectId(req, res, next) {
	if (!mongoose.Types.ObjectId.isValid(req.params.id))
		return res.status(404).send('Invalid ID');
	next();
}

export { validateObjectId };

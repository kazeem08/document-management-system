import jwt from 'jsonwebtoken';
// import config from 'config';
import dotenv from 'dotenv';
dotenv.config();

//authentication to verify jwt token
function auth(req, res, next) {
	const token = req.header('x-auth-token');
	if (!token) return res.status(401).send('Access denied! No token provided');

	try {
		const decoded = jwt.verify(token, process.env.jwtPrivateKey);
		req.user = decoded;
		next();
	} catch {
		res.status(400).send('Invalid token');
	}
}

export { auth };

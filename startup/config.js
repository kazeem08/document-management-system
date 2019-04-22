//Validating jwt key
const jwt = process.env.jwtPrivateKey;

function jwtKey() {
	if (!jwt) {
		throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
	}
}

export { jwtKey };

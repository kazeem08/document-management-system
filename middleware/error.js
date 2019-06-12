const winston = require('winston');

//error handling for server
function error(err, req, res, next) {
	// winston.log("error", err.message);
	winston.error(err.message, err);
	res.status(500).send('Something failed');
}

module.exports = error;

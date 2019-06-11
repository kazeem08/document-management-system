import winston from 'winston';
// require("winston-mongodb");
import 'express-async-errors';

function errorHandling() {
	winston.handleExceptions(
		new winston.transports.Console({ colorize: true, prettyPrint: true }),
		new winston.transports.File({
			filename: 'uncaughtExceptions.log'
		})
	);

	process.on('unhandledRejection', ex => {
		// winston.error(ex.message, ex);
		throw ex;
	});
	winston.add(
		// new winston.transports.File({ filename: "logfile.log"})
		winston.transports.File,
		{ filename: 'logfile.log' }
	);

	// winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });
}

export { errorHandling };

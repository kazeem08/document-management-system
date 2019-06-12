const rolesRoute = require('../routes/roles');
const usersRoute = require('../routes/users');
const loginRoute = require('../routes/login');
const documentRoute = require('../routes/documents');
const logoutRoute = require('../routes/logout');
const error = require('../middleware/error');

function routes(app) {
	app.use('/api/roles', rolesRoute.router);
	app.use('/api/users', usersRoute.router);
	app.use('/api/login', loginRoute.router);
	app.use('/api/documents', documentRoute.router);
	app.use('/api/logout', logoutRoute.router);

	app.use(error);
}

module.exports = routes;

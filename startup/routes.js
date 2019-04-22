import { roles } from '../routes/roles';
import { users } from '../routes/users';
import { login } from '../routes/login';
import { documents } from '../routes/documents';
import { error } from '../middleware/error';

function routes(app) {
	app.use('/api/roles', roles);
	app.use('/api/users', users);
	app.use('/api/login', login);
	app.use('/api/documents', documents);
	app.use(error);
}

export { routes };

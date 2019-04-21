import { Role, validateRole } from '../models/role';

//creating role controller
class RoleController {
	//method to get all roles
	async getRoles(req, res) {
		const roles = await Role.find();
		res.send(roles);
	}

	//method to get role by ID
	async getById(req, res) {
		const role = await Role.findById(req.params.id);
		if (!role) return res.status(404).send('There is no role with the ID');
		res.send();
	}
}

const roleController = new RoleController();

export { roleController };

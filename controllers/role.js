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

	//method to create role
	async createRole(req, res) {
		const { error } = validateRole(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		let role = await Role.findOne({ title: req.body.title });
		if (role) return res.status(400).send('Role already exist');

		role = new Role({
			title: req.body.title
		});

		await role.save();
		res.send(role);
	}
}

const roleController = new RoleController();

export { roleController };

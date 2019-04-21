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

	//method to update role
	async updateRole(req, res) {
		const { error } = validateRole(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		let role = await Role.findById(req.params.id);
		if (!role) return res.status(404).send('Role does not exist');

		role = await Role.findByIdAndUpdate(
			req.params.id,
			{
				title: req.body.title
			},
			{ new: true }
		);

		res.send(role);
	}

	async deleteRole(req, res) {
		let role = await Role.findById(req.params.id);
		if (!role) return res.status(404).send('Role does not exist');
		res.send(role);
	}
}

const roleController = new RoleController();

export { roleController };

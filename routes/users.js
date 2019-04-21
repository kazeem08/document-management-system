import express from 'express';
import { User, validateUser } from '../models/user';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';
import { validateObjectId } from '../middleware/validateObjectId';
import { userController } from '../controllers/user';
import { Role } from '../models/role';

const router = express.Router();

//routet to get all users
router.get('/', [auth, admin], userController.getAllUsers);

//route to get user by Id
router.get('/:id', validateObjectId, [auth, admin], userController.getById);

//route to create user
router.post('/', userController.createUser);

//route to update user
router.put('/:id', validateObjectId, auth, userController.updateUser);

//route to delete
router.delete('/:id', validateObjectId, auth, async (req, res) => {
	let user = await User.findByIdAndDelete(req.params.id);
	if (!user) return res.status(404).send('User does not exist');

	res.send(user);
});

export { router as users };

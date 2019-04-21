import express from 'express';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';
import { validateObjectId } from '../middleware/validateObjectId';
import { roleController } from '../controllers/role';
const router = express.Router();

//route to get all roles
router.get('/', [auth, admin], roleController.getRoles);

//route to get role by id
router.get('/:id', [validateObjectId, auth, admin], roleController.getById);

//route to create a role
router.post('/', [auth, admin], roleController.createRole);

router.put('/:id', [validateObjectId, auth, admin], roleController.updateRole);

router.delete('/:id', [auth, admin], roleController.deleteRole);

export { router as roles };

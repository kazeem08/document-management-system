import express from 'express';
import { logoutController } from '../controllers/logout';
import { auth } from '../middleware/auth';

const router = express.Router();

//route to log in
router.post('/', auth, logoutController.logout);

export { router as logout };

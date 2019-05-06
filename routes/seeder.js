import express from 'express';
import { userController } from '../controllers/seeder';

const router = express.Router();

//routet to generate fake users
router.get('/users', userController.fakeUsers);

export { router as seeder };

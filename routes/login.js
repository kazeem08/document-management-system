import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

//route to log in
router.post('/api/login', (req, res) => {
	res.send();
});

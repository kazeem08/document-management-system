import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
	res.status(401).send('Unauthorized');
});

export { router as roles };

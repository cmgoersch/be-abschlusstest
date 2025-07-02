import express from 'express';
import { register, login } from '../controllers/userController.js';
import validate from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/register', validate, register);
router.post('/login', login);

export default router;
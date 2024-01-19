import express from 'express';
const router = express.Router();
import { login, logout } from '../app/controllers/userController.js';

router.post('/login', login);
router.post('/logout', logout);

export default router;


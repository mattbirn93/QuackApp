import { Router } from 'express';
import { createUser, fetchUserById } from '../controllers/userController.js';

const router = Router();

router.post('/', createUser);
router.get('/fetchUserById', fetchUserById);
export default router;

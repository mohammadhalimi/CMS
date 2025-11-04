import { Router } from 'express';
import { UserController } from '../controllers/user.controllers'
import { verifyToken } from '../../../../interface-adapters/http/middlewares/auth.middleware';
const router = Router();

router.post('/register' ,UserController.register );
router.post('/login' ,UserController.login);
router.patch('/profile', verifyToken, UserController.updateProfile);

export default router;

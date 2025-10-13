import { Router } from 'express';
import { AdminController } from '../controllers/admin.controllers';
import { verifyAdminToken } from '../../../../interface-adapters/http/middlewares/auth.middleware';
 import { UserController } from '../controllers/user.controllers';

const router = Router();

router.post('/register', verifyAdminToken, AdminController.register);
router.post('/login', AdminController.login);
router.get('/all', verifyAdminToken, AdminController.getAll);
router.get('/allUsers', verifyAdminToken, UserController.getAll);

export default router;

import { Router } from 'express';
import { AdminController } from '../controllers/admin.controllers';
import { verifyAdminToken } from '../../../../interface-adapters/http/middlewares/auth.middleware';

const router = Router();

router.post('/register', verifyAdminToken, AdminController.register);
router.post('/login', AdminController.login);
router.get('/all', verifyAdminToken, AdminController.getAll);

export default router;

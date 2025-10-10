import { Router } from 'express';
import { AdminController } from '../controllers/admin.controllers';

const router = Router();

router.post('/register', AdminController.register);
router.post('/login', AdminController.login);

export default router;

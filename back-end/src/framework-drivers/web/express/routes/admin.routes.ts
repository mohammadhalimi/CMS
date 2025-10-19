import { Router } from 'express';
import { AdminController } from '../controllers/admin.controllers';
import { verifyAdminToken } from '../../../../interface-adapters/http/middlewares/auth.middleware';
import { UserController } from '../controllers/user.controllers';
import express from 'express';
import multer from 'multer';
import path from 'path';

const router = Router();

const router2 = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../../uploads/admins')); // مسیر ذخیره عکس‌ها
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// مسیر آپلود عکس پروفایل
router.post(
  '/upload-profile',
  verifyAdminToken,
  upload.single('profileImage'),
  AdminController.uploadProfileImage
);

router.post('/register', verifyAdminToken, AdminController.register);
router.post('/login', AdminController.login);
router.get('/all', verifyAdminToken, AdminController.getAll);
router.get('/allUsers', verifyAdminToken, UserController.getAll);
router.put('/update-profile',verifyAdminToken, AdminController.updateProfile);

export default router;

import { Router } from 'express';
import { UserController } from '../controllers/user.controllers'
import { verifyToken } from '../../../../interface-adapters/http/middlewares/auth.middleware';
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../../uploads/users')); // مسیر ذخیره عکس‌ها
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
  verifyToken,
  upload.single('profileImage'),
  UserController.uploadProfileImage
);

router.post('/register' ,UserController.register );
router.post('/login' ,UserController.login);
router.patch('/profile', verifyToken, UserController.updateProfile);

export default router;

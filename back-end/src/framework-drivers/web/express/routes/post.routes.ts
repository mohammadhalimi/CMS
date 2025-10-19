import express from 'express';
import { PostController } from '../controllers/post.controllers';
import { verifyAdminToken } from '../../../../interface-adapters/http/middlewares/auth.middleware';
import { upload } from '../../../../framework-drivers/config/multer.config'; // 👈 اضافه شد

const router = express.Router();

// فقط ادمین بتونه پست جدید بسازه + آپلود عکس
router.post(
  '/create',
  verifyAdminToken,
  upload.single('coverImage'), // 👈 اینجا اضافه شد
  PostController.create
);

// همه بتونن پست‌ها رو ببینن
router.get('/all', PostController.getAll);
// ✅ دریافت یک پست خاص با id
router.get('/:id', PostController.getById);

// ✅ دریافت پست‌های یک دسته‌بندی خاص
router.get('/category/:category', PostController.getByCategory);
export default router;

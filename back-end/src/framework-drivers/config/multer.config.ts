import multer from 'multer';
import path from 'path';
import fs from 'fs';

// مسیر ذخیره عکس‌ها
const uploadPath = path.join(__dirname, '../../uploads/posts');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// تنظیمات multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

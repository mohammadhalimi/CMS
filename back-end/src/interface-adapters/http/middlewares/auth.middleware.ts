import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'توکن احراز هویت ارسال نشده است' });
    }

    const token = authHeader.split(' ')[1];

    // بررسی صحت توکن با secret key که در env ذخیره کردی
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // اگر خواستی نقش کاربر هم بررسی بشه
    if ((decoded as any).role !== 'admin') {
      return res.status(403).json({ message: 'دسترسی غیرمجاز' });
    }

    // اگر همه چیز اوکی بود، اطلاعات توکن رو در req ذخیره می‌کنیم
    (req as any).admin = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'توکن نامعتبر است یا منقضی شده است' });
  }
};

// 🟢 برای تمام کاربران (ادمین یا یوزر)
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'توکن ارسال نشده است' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    // اطلاعات کاربر رو در req ذخیره می‌کنیم
    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'توکن نامعتبر یا منقضی شده است' });
  }
};

// 🔴 فقط برای ادمین‌ها
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'فقط ادمین‌ها مجاز هستند' });
  }

  next();
};

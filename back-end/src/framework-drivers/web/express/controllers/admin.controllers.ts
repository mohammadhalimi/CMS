import { Request, Response } from 'express';
import { registerAdmin } from '../../../../use-case/auth/register-admin.usecase';
import { loginAdmin } from '../../../../use-case/auth/login-admin.usecase';
import { getAllAdmins } from '../../../../use-case/auth/get-all-admins.usecase';
import { AdminModel } from '../../../database/model/admin.model';
import bcrypt from 'bcryptjs';

export const AdminController = {
  // ثبت‌نام ادمین جدید
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, bio } = req.body;
      const admin = await registerAdmin(name, email, password);
      res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  // لاگین ادمین
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await loginAdmin(email, password);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  // دریافت لیست همه ادمین‌ها (اختیاری)
  async getAll(req: Request, res: Response) {
    try {
      const admins = await getAllAdmins();
      res.status(200).json(admins);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // 📸 آپلود عکس پروفایل
  async uploadProfileImage(req: Request, res: Response) {
    try {
      const adminId = (req as any).admin.id; // از توکن گرفته میشه
      const filePath = `/uploads/admins/${req.file?.filename}`;

      await AdminModel.findByIdAndUpdate(adminId, { profileImage: filePath });

      res.status(200).json({
        message: 'عکس پروفایل با موفقیت آپلود شد',
        profileImage: filePath,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  // 🧑‍💼 ویرایش اطلاعات ادمین خودش
  async updateProfile(req: Request, res: Response) {
    try {
      const adminId = (req as any).admin.id; // از توکن گرفته میشه
      const { name, email, password } = req.body;

      const updates: any = {};

      if (name) updates.name = name;
      if (email) updates.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updates.password = hashedPassword;
      }

      const updatedAdmin = await AdminModel.findByIdAndUpdate(
        adminId,
        { $set: updates },
        { new: true }
      ).select('-password'); // پسورد برنگرده

      res.status(200).json({
        message: 'پروفایل با موفقیت بروزرسانی شد ✅',
        admin: updatedAdmin,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};

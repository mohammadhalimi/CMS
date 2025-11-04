import { Request, Response } from 'express';
import { registerUser } from '../../../../use-case/auth/register-user.usecase';
import { loginUser } from '../../../../use-case/auth/login-user.usecase';
import { getAllUsers } from '../../../../use-case/auth/get-all-users.usecase';
import { UserModel } from '../../../database/model/user.model';
import bcrypt from 'bcryptjs';
import { updateUserProfile } from '../../../../use-case/auth/update-user-profile.usecase';

export const UserController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await registerUser(name, email, password);
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  async getAll(req: Request, res: Response) {
    try {
      const admins = await getAllUsers();
      res.status(200).json(admins);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await loginUser(email, password);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  },
  async updateProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id; // از توکن گرفته میشه
      const { name, email, password, bio } = req.body;

      const updates: any = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (bio) updates.bio = bio;
      if (password) {
        updates.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true }
      ).select('-password');

      res.status(200).json({
        message: 'پروفایل با موفقیت بروزرسانی شد ✅',
        user: updatedUser,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};

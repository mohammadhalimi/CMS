import { Request, Response } from 'express';
import { registerAdmin } from '../../../../use-case/auth/register-admin.usecase';
import { loginAdmin } from '../../../../use-case/auth/login-admin.usecase';

export const AdminController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const admin = await registerAdmin(name, email, password);
      res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await loginAdmin(email, password);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};

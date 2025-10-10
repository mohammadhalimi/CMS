import { AdminModel } from '../../framework-drivers/database/model/admin.model';
import bcrypt from 'bcryptjs';

export const AdminRepository = {
  async createAdmin(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new AdminModel({ name, email, password: hashedPassword });
    return await admin.save();
  },

  async findByEmail(email: string) {
    return await AdminModel.findOne({ email });
  },
};

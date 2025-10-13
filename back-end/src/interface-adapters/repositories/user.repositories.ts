import { UserModel } from '../../framework-drivers/database/model/user.model';
import bcrypt from 'bcryptjs';

export const UserRepository = {
  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new UserModel({ name, email, password: hashedPassword });
    return await admin.save();
  },
  async getAll() {
    const users = await UserModel.find().select("-password");
    return users;
  },
  async findByEmail(email: string) {
    return await UserModel.findOne({ email });
  },
};

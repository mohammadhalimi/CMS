import { UserModel } from '../../framework-drivers/database/model/user.model';
import bcrypt from 'bcryptjs';

export const updateUserProfile = async (userId: string, updates: any) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error('کاربر یافت نشد');

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true }
  ).select('-password');

  return updatedUser;
};

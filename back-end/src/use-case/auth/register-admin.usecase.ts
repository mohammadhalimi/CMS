import { AdminRepository } from '../../interface-adapters/repositories/admin.repositories';

export const registerAdmin = async (name: string, email: string, password: string) => {
  const existingAdmin = await AdminRepository.findByEmail(email);
  if (existingAdmin) throw new Error('Admin already exists');
  return await AdminRepository.createAdmin(name, email, password);
};

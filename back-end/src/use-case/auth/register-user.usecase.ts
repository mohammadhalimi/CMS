import { UserRepository } from '../../interface-adapters/repositories/user.repositories';

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await UserRepository.findByEmail(email);
  if (existingUser) throw new Error('User already exists');
  return await UserRepository.createUser(name, email, password);
};

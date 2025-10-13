import { UserRepository } from "../../interface-adapters/repositories/user.repositories";

export const getAllUsers = async () => {
  const users = await UserRepository.getAll();
  return users;
};

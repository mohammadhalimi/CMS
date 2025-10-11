import { AdminRepository } from "../../interface-adapters/repositories/admin.repositories";

export const getAllAdmins = async () => {
  const admins = await AdminRepository.getAll();
  return admins;
};

import { AdminRepository } from '../../interface-adapters/repositories/admin.repositories';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../framework-drivers/config/env';

export const loginAdmin = async (email: string, password: string) => {
  const admin = await AdminRepository.findByEmail(email);
  if (!admin) throw new Error('Admin not found');

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error('Invalid password');

  const payload = { 
    id: admin._id,
    name: admin.name,  
    email: admin.email, 
    role: admin.role,
    profileImage: admin.profileImage,
    bio: admin.bio
  };

 const options: jwt.SignOptions = {
  expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn']
};
  const token = jwt.sign(payload, env.jwtSecret, options);

  return { 
    token, 
    admin: { 
      id: admin._id, 
      name: admin.name, 
      email: admin.email,
      role:admin.role,
      profileImage: admin.profileImage,
      bio: admin.bio
    } 
  };
};
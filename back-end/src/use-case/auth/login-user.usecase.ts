import { UserRepository } from '../../interface-adapters/repositories/user.repositories';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../framework-drivers/config/env';

export const loginUser = async (email: string, password: string) => {
  const user = await UserRepository.findByEmail(email);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const payload = { 
    id: user._id,
    name: user.name,  
    email: user.email, 
    role: user.role 
  };

 const options: jwt.SignOptions = {
  expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn']
};
  const token = jwt.sign(payload, env.jwtSecret, options);

  return { 
    token, 
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email,
      role:user.role
    } 
  };
};
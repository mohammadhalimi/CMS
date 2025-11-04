export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  bio?: string; 
  role?: 'user' | 'vip' | 'moderator';
  createdAt?: Date;
}

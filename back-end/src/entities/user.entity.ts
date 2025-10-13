export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'vip' | 'moderator';
  createdAt?: Date;
}

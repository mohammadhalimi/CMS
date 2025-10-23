export interface Admin {
  id?: string;
  name: string;
  email: string;
  password: string;
  profileImage?: string; 
  role?: 'admin';
  bio?: string;
  createdAt?: Date;
}

export interface Admin {
  id?: string;
  name: string;
  email: string;
  password: string;
  profileImage?: string; 
  role?: 'admin';
  createdAt?: Date;
}

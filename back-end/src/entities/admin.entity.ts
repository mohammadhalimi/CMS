export interface Admin {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: 'admin';
  createdAt?: Date;
}

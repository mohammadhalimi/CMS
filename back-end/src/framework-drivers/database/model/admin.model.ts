import mongoose, { Schema, Document } from 'mongoose';

export interface AdminDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  profileImage?: string; 
  createdAt: Date;
}

const adminSchema = new Schema<AdminDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  profileImage: { type: String, default: '' }, 
  createdAt: { type: Date, default: Date.now },
});

export const AdminModel = mongoose.model<AdminDocument>('Admin', adminSchema);


import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  profileImage?: string; 
  role: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  profileImage: { type: String, default: '' }, 
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<UserDocument>('user', userSchema);

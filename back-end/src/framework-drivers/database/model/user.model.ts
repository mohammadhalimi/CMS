import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  bio?: string;
  createdAt: Date;
  role:string;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: '' },
  bio: { type: String, required: true },
  role: { type:String },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);

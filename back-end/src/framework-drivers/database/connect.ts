import mongoose from 'mongoose';
import env from '../config/env';

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
    process.exit(1);
  }
};

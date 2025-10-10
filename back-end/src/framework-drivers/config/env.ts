import dotenv from 'dotenv';
dotenv.config();

const env = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cms',
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
};

export default env;

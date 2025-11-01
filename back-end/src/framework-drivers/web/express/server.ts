import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000', // دامنه فرانت‌اند
  credentials: true // مهم: برای ارسال کوکی‌ها
}));
app.use(express.json());
app.use(morgan('dev'));

// تست اولیه
app.get('/', (req, res) => {
  res.send('🚀 CMS Backend is running!');
});

import adminRoutes from './routes/admin.routes';
app.use('/admin', adminRoutes);

import userRoutes from './routes/user.routes'

app.use('/user', userRoutes);

import postRoutes from './routes/post.routes';

app.use('/api/posts', postRoutes);
const uploadsPath = path.resolve(__dirname, '../../../uploads');

app.use('/uploads', express.static(uploadsPath, {
  setHeaders: (res) => {
    // اجازه دسترسی از فرانت‌اند
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  },
}));

import commentRoutes from './routes/comment.routes';

app.use('/comments', commentRoutes);

export default app;

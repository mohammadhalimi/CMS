import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

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

export default app;

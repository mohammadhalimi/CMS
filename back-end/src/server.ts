import app from './framework-drivers/web/express/server';
import { connectDB } from './framework-drivers/database/connect';
import env from './framework-drivers/config/env';

const start = async () => {
  try {
    await connectDB();
    app.listen(env.port, () => {
      console.log(`🚀 Server is running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
  }
};

start();

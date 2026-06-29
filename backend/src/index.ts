import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

const app = express();
const PORT = process.env.PORT || 5000;

import jobRoutes from './routes/job.routes';
import aiRoutes from './routes/ai.routes';
import webhookRoutes from './routes/webhook.routes';
import applicationRoutes from './routes/application.routes';
import userRoutes from './routes/user.routes';

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

// Webhook route needs raw body for verification
app.use('/api/v1/webhooks', express.raw({ type: 'application/json' }), webhookRoutes);

app.use(express.json());

app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/users', userRoutes);

import { errorHandler, notFoundHandler } from './middleware/error.middleware';

app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, message: 'API is healthy' });
});

// Error handlers must be registered after all routes
app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;

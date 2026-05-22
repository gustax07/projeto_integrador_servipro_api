import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { globalLimiter } from './middleware/rateLimiter.middleware';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'
import Logger from './config/logger';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50kb' }));
app.use(helmet());
app.use(globalLimiter);

// ... morgan e outros middlewares
const stream = {
  write: (message: string) => Logger.http(message.trim()),
};

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream }));

app.use(routes)
// Start server
app.listen(port, () => {
  console.log(`🚀 API server running at http://localhost:${port}`);
});
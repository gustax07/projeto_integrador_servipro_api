import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { globalLimiter } from './middleware/rateLimiter.middleware';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'
import Logger from './config/logger';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './config/swagger';
import { AppError } from './utils/AppError';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.set('trust proxy', 1);
app.use(cors());
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(helmet());
app.use(globalLimiter);
// ... morgan e outros middlewares
const stream = {
  write: (message: string) => Logger.http(message.trim()),
};

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      Logger.error(err.message);
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    if (err.name === 'PrismaClientKnownRequestError') {
         console.error('Erro de Banco de Dados:', err);
         Logger.error(err.message);
         return res.status(400).json({
             status: 'error',
             message: 'Ocorreu um erro ao processar os dados no banco.'
         });
    }

    console.error('Erro Interno Crítico:', err);
    Logger.error(err.message);
    return res.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor. Tente novamente mais tarde.'
    });
});
  

// Start server
app.listen(Number(port), '0.0.0.0', () => {
  console.log(`🚀 API server running at http://localhost:${port}`);
});
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';

const app = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://store-xpert.netlify.app/'],
    credentials: true,
  }),
);
app.use(cookieParser());

// default route
app.get('/', (req: Request, res: Response) => {
  const serverStatus = {
    status: 'running',
    message: 'Store Xpert API is operational and running smoothly.',
    timestamp: new Date().toISOString(),
    version: 'v1.0.1',
    uptime: process.uptime(),
    author: 'Store Xpert Team',
    contact: {
      email: 'contact@storexpert.com',
      website: 'https://www.storexpert.com/contact',
    },
  };

  res.json(serverStatus);
});

// application routes
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;

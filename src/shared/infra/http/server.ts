import 'reflect-metadata';
import 'dotenv/config';

import cookieParser from 'cookie-parser';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import csrf from 'csurf';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';
import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

const csrfProtection = csrf({
  cookie: true,
});

app.use(
  cors({
    origin: process.env.APP_API_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(csrfProtection);
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});

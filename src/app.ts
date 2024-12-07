/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';

// Parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoutes);

app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(
    'Hello developers, I am Ishtiak From Rangpur, I am developing PH-University 🦄!',
  );
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  const message = err.message || 'Something went worng';
  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
});

export default app;

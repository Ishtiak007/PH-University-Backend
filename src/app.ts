import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

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

app.use(globalErrorHandler);

export default app;

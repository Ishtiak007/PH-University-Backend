import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

// Parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
  // const a = 10;
  // res.send(a);
};

app.get('/', test);

app.use(globalErrorHandler);

// not found middleware
app.use(notFound);

export default app;

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went worng';
  type TErrorSource = {
    path: string | number;
    message: string;
  }[];
  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Someting went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Ami zod error';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    errorHere: err,
  });
};

export default globalErrorHandler;

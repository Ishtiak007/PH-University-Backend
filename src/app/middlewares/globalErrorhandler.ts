/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went worng';
  type TErrorSource = {
    path: string | number;
    message: string;
  }[];
  const errorSources: TErrorSource = [
    {
      path: '',
      message: 'Someting went wrong!!!!!!??????????',
    },
  ];

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error: err,
  });
};

export default globalErrorHandler;

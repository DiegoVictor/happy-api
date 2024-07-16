import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
  err,
  request,
  response,
  next,
) => {
  return response.status(500).json({
    message: 'Internal Server Error',
  });
};

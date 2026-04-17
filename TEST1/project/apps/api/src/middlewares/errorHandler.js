import { AppError } from '../utils/errors.js';

export function errorHandler(err, req, reply) {
  if (err instanceof AppError) {
    return reply.code(err.statusCode).send({
      type: `https://agileflow.io/errors/${err.code.toLowerCase()}`,
      title: err.code,
      status: err.statusCode,
      detail: err.message,
    });
  }

  req.log.error(err);
  return reply.code(500).send({
    type: 'https://agileflow.io/errors/internal',
    title: 'INTERNAL_SERVER_ERROR',
    status: 500,
    detail: 'An unexpected error occurred',
  });
}

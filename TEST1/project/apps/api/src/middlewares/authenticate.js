import { AppError } from '../utils/errors.js';

export async function authenticate(req, reply) {
  try {
    await req.jwtVerify();
  } catch {
    throw new AppError(401, 'UNAUTHORIZED', 'Authentication required');
  }
}
